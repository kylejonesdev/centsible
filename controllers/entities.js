const Entity = require('../models/Entity');
const Transaction = require('../models/Transaction');
const mongoose = require('mongoose');

module.exports = {
    getEntities: async (req, res) => {
        try {
            const entities = await Entity
            .find({ user: req.user.id })
            .sort({ name: 1 })
            .lean();
            res.render("entities.ejs", { entities: entities, user: req.user });
            console.log(entities);
        } catch(err) {
            console.error(err);
        }
    },
    getEntity: async (req, res) => {
        try {
            let sortOrder = req.params.sortOrder;
            switch(sortOrder) {
                case 'date':
                  sortOrder = { date: -1 }
                  break;
                case 'payee':
                  sortOrder = { payee: 1 }
                  break;
                case 'type':
                  sortOrder = { type: 1 }
                  break;
                case 'amount':
                  sortOrder = { amount: -1 }
                  break;
                default:
                  sortOrder = { date: -1 }
            }
            const entity = await Entity.findOne({ _id: req.params.id });
            const relevantTransactions = await Transaction
            .aggregate([
                {
                  $match: { //find the following with all conditions true
                        payee: new mongoose.Types.ObjectId(req.params.id)
                  }
                },
                {
                  $lookup: { //join entities collection to payee id to get the payee name
                    from: "entities",
                    localField: "payee",
                    foreignField: "_id",
                    as: "payee"
                  }
                },
                {
                  $unwind: "$payee" //remove the joined object from the returned array
                },
                {
                  $lookup: { //join the accounts collection to account to get the account name
                    from: "accounts",
                    localField: "account",
                    foreignField: "_id",
                    as: "account"
                  }
                },
                {
                  $unwind: "$account" //remove the joined object from the returned array
                },
                {
                  $project: { //return only the following fields named as shown and their values as formatted
                    date: {
                      $dateToString: {
                        date: "$date",
                        format: "%Y-%m-%d"
                      }
                    },
                    payee: "$payee.name",
                    payeeId: "$payee._id",
                    type: "$type",
                    account: "$account.name",
                    accountId: "$account._id",
                    amount: "$amount"
                  }
                },
                {
                  $sort: sortOrder
                }
            ]);
            console.log(entity);
            console.log(req.params.id)
            console.log(relevantTransactions);
            const total = relevantTransactions.reduce((acc, item) => acc + item.amount, 0);
            res.render("entity.ejs", { entity: entity, transactions: relevantTransactions, total: total, user: req.user });
        } catch(err) {
            console.error(err);
        }
    },
    createEntity: async (req, res) => {
        try {
            Entity.create(
                {
                    name: req.body.name,
                    street: req.body.street,
                    city: req.body.city,
                    state: req.body.state,
                    country: req.body.country,
                    zip: req.body.zip,
                    phone: req.body.phone,
                    email: req.body.email,
                    notes: req.body.notes,
                    user: req.user.id,
                }
            )
            console.log(`Entity: ${req.body.name} has been added.`)
            res.redirect("/entities");
        } catch(err) {
            console.error(err);
        }
    },
    updateEntity: async (req, res) => {
        try {
            await Entity.findOneAndUpdate({ _id: req.params.id },
                {
                    name: req.body.name,
                    street: req.body.street,
                    city: req.body.city,
                    state: req.body.state,
                    country: req.body.country,
                    zip: req.body.zip,
                    phone: req.body.phone,
                    email: req.body.email,
                    notes: req.body.notes,
                    user: req.user.id,
                }
            )
            res.redirect(`/entities`);
        } catch(err) {
            console.error(err);
        }
    },
    deleteEntity: async (req, res) => {
        try {
            const relatedTransactions = await Transaction
            .findOne(
                { 
                    $or: [{payor: req.params.id }, { payee: req.params.id }] 
                }
            );
            const errorMessages = [];
            if(relatedTransactions) {
                errorMessages.push({ msg: "You cannot delete an entity if it is a payor or payee on a transaction."});
            }
            if (errorMessages.length) {
                console.log(errorMessages);
                req.flash("errors", errorMessages);
            }
            if(!relatedTransactions) {
                const entity = await Entity.find({ _id: req.params.id });
                await Entity.deleteOne({ _id: req.params.id });
                console.log(`Entity Deleted: ${entity}.`);
            }
            res.redirect("/entities");
        } catch(err) {
            console.error(err)
        }
    }
}