const Transaction = require("../models/Transaction");
const Entity = require("../models/Entity");
const Account = require("../models/Account")

module.exports = {
    getDashboard: async (req, res) => {
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
            case 'account':
                sortOrder = { account: 1 }
                break;
            case 'amount':
                sortOrder = { amount: -1 }
                break;
            default:
                sortOrder = { date: -1 }
        }        
        try {
            const transactions = await Transaction
            .find(
                { user: req.user.id }, 
                {
                    date: 1,
                    account: 1,
                    amount: 1
                }
            )
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
                }
            ])
            const createExampleEntities = async (req, res) => {
                await Entity.insertMany([
                    {
                    name: "Examply Exampleton",
                    street: "123 Some St.",
                    city: "Cityton",
                    state: "Stateland",
                    country: "COU",
                    zip: "12345",
                    phone: "303-825-2525",
                    email: "ex@example.com",
                    notes: "The best of examples.",
                    user: req.user._id,
                    },
                    {
                    name: "Isaac Asimov",
                    street: "123 Robot St.",
                    city: "Scifiton",
                    state: "Futureland",
                    country: "USA",
                    zip: "00101",
                    phone: "010-100-1001",
                    email: "sci@books.com",
                    notes: "Good books.",
                    user: req.user._id,
                    }
                ]);
            };
            const createExampleAccounts = async (req, res) => {
                await Account.insertMany([
                    {
                    name: "Cash",
                    number: "0001",
                    type: "Income",
                    description: "Cash received.",
                    user: req.user.id,
                    },
                    {
                    name: "Office Supplies",
                    number: "0002",
                    type: "Expense",
                    description: "Envelopes, pens, and stamps.",
                    user: req.user.id,
                    }
                ]);
            };
            const createExampleTransactions = async (req, res) => {
                // await Transaction.insertMany([
                //     {
                //     user: req.user.id,
                //     payor: {
                //         [
                //             Entity.find({ name: "Examply Exampleton"}).id]
                //     }
                //     payee: req.body.payee,
                //     date: req.body.date,
                //     account: req.body.account,
                //     amount: req.body.amount,
                //     description: req.body.description,
                //     },
                //     {
                //     user: req.user.id,
                //     payor: req.body.payor,
                //     payee: req.body.payee,
                //     date: req.body.date,
                //     account: req.body.account,
                //     amount: req.body.amount,
                //     description: req.body.description,
                //     }
                // ]);
            };
            const entities = await Entity.find({ user:req.user.id });
            const accounts = await Account.find({ user:req.user.id });
            const total = transactions.reduce((acc, item) => {
                return acc + item.amount;
            }, 0)
            if(!entities.length) {
                console.log("Creating example entities.");
                createExampleEntities(req);
            }
            if(!accounts.length) {
                console.log("Creating example accounts.");
                createExampleAccounts(req);
            }
// @TODO Adjust above to include entity ID but leave behind unnecessary entity info (addres, notes, etc)
            console.log(transactions);
            res.render("dashboard.ejs", {transactions: transactions, entities: entities, accounts: accounts, user: req.user, total: total});
        } catch(err) {
            console.error(err);
        }
    }
}