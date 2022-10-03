const Entity = require('../models/Entity');
const Transaction = require('../models/Transaction');

module.exports = {
    getEntities: async (req, res) => {
        try {
            const entities = await Entity
            .find({ user: req.user.id })
            .sort({ name: 1 })
            .lean();
            res.render("entities.ejs", { entities: entities, user: req.user });
        } catch(err) {
            console.error(err);
        }
    },
    getEntity: async (req, res) => {
        try {
            let sortOrder = req.params.sortOrder;
            switch(sortOrder) {
                case 'date':
                    sortOrder = { date: 1 }
                    break;
                case 'payor':
                    sortOrder = { payor: 1 }
                    break;
                case 'payee':
                    sortOrder = { payee: 1 }
                    break;
                case 'amount':
                    sortOrder = { amount: -1 }
                    break;
                default:
                    sortOrder = { date: -1 }
            }
            const entity = await Entity.findOne({ _id: req.params.id });
            const relevantTransactions = await Transaction
            .find(
                {
                    $or: [
                        { payor: req.params.id },
                        { payee: req.params.id }
                    ]
                }
            )
            .sort(
                sortOrder
            )
            .populate(
                [
                    {
                        path: "payor",
                        select: "name"
                    },
                    {
                        path: "payee",
                        select: "name"
                    },
                    {
                        path: "account",
                        select: "name"
                    },
                ]
            )
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