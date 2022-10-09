const Account = require('../models/Account');
const Transaction = require('../models/Transaction');
const mongoose = require('mongoose');

module.exports = {
    getAccounts: async (req, res) => {
        try {
            let sortOrder = req.params.sortOrder;
            switch(sortOrder) {
                case 'number':
                    sortOrder = { number: 1 }
                    break;
                case 'name':
                    sortOrder = { name: 1 }
                    break;
                default:
                    sortOrder = { number: 1 }
            }   
            const accounts = await Account
            .find({ user: req.user._id })
            .sort( sortOrder )
            .lean();
            res.render("accounts.ejs", { accounts: accounts, user: req.user });
        } catch(err) {
            console.error(err);
        }
    },
    getAccount: async (req, res) => {
        try {
            let sortOrder = req.params.sortOrder;
            switch(sortOrder) {
                case 'date':
                    sortOrder = { date: -1 }
                    break;
                case 'payee':
                    sortOrder = { payee: 1 }
                    break;
                case 'income':
                    sortOrder = { amount: -1 }
                    break;
                case 'expense':
                    sortOrder = { amount: -1 }
                    break;
                default:
                    sortOrder = { date: -1 }
            }    
            const account = await Account.findOne({ _id: req.params.id });
            const relevantTransactions = await Transaction
            .aggregate([
                {
                  $match: { //find the following with all conditions true
                        account: new mongoose.Types.ObjectId(req.params.id)
                    },
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
                    account: "$account.name",
                    accountId: "$account._id",
                    income: "$income",
                    expense: "$expense",
                  }
                },
            ]);
            const calculateTotal = (arr, transactionField) => {
                //console.log(transactionField);
                return arr.reduce((acc, item) => {
                  //console.log(item[transactionField]);
                  return acc + item[transactionField]
                }, 0);
            }
            res.render("account.ejs", { account: account, transactions: relevantTransactions, totalIncome: calculateTotal(relevantTransactions, "income"), totalExpense: calculateTotal(relevantTransactions, "expense"), user: req.user });
        } catch(err) {
            console.error(err);
        }
    },
    createAccount: async (req, res) => {
        try {
            Account.create(
                {
                    name: req.body.name,
                    number: req.body.number,
                    description: req.body.description,
                    user: req.user.id,
                }
            )
            console.log(`Account: ${req.body.name} has been added.`)
            res.redirect("/accounts");
        } catch(err) {
            console.error(err);
        }
    },
    updateAccount: async (req, res) => {
        try {
            await Account.findOneAndUpdate({ _id: req.params.id },
                {
                    name: req.body.name,
                    number: req.body.number,
                    description: req.body.description,
                    user: req.user.id,
                }
            )
            res.redirect(`/accounts`);
        } catch(err) {
            console.error(err);
        }
    },
    deleteAccount: async (req, res) => {
        try {
            const relatedTransactions = await Transaction.findOne({ account: req.params.id });
            const errorMessages = [];
            if (relatedTransactions)
              errorMessages.push({ msg: "You cannot delete an account while it still contains transactions." });
            if (errorMessages.length) {
              console.log(errorMessages);
              req.flash("errors", errorMessages);
            }
            if(!relatedTransactions) {
                const account = await Account.find({ _id: req.params.id });
                const deleted = await Account.deleteOne({ _id: req.params.id });
                console.log(`Account Deleted: ${account}.`);
            }
            res.redirect("/accounts");
        } catch(err) {
            console.error(err)
        }
    }
}