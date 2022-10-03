const Account = require('../models/Account');
const Transaction = require('../models/Transaction');

module.exports = {
    getAccounts: async (req, res) => {
        try {
            let sortOrder = req.params.sortOrder;
            switch(sortOrder) {
                case 'number':
                    sortOrder = { number: -1 }
                    break;
                case 'name':
                    sortOrder = { name: 1 }
                    break;
                case 'type':
                    sortOrder = { type: 1 }
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
            const account = await Account.findOne({ _id: req.params.id });
            const relevantTransactions = await Transaction
            .find({
                $and: [
                    {user: req.user._id}, 
                    {account: account}
                ]
            })
            .sort(
                sortOrder
            )
            .populate([
                {
                    path: 'payor',
                    select: 'name'
                },
                {
                    path: 'payee',
                    select: 'name'
                },
                {
                    path: 'account',
                    select: 'name'
                },
            ])
            const total = relevantTransactions.reduce((acc, item) => acc + item.amount, 0);
            res.render("account.ejs", { account: account, transactions: relevantTransactions, total: total, user: req.user });
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
                    type: req.body.type, //how to limit type to a few options at the DB level?
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
                    type: req.body.type, //how to limit type to a few options at the DB level?
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