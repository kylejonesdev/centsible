const mongoose = require('mongoose');
const Transaction = require("../models/Transaction");
const transactionController = require("../controllers/transactions")
const Entity = require("../models/Entity");
const Account = require("../models/Account")

module.exports = {
    getDashboard: async (req, res) => {
        try {
            //Initialize all filters and sorts to default values
            let filterDateRangeStart = 0;
            let filterDateRangeEnd =  Date.now();          
            //Get filter values from client if they are provided
            if(req.body.filterDateRangeStart) {
                filterDateRangeStart = req.body.filterDateRangeStart;
            }
            if(req.body.filterDateRangeEnd) {
                filterDateRangeEnd = req.body.filterDateRangeEnd;
            }
            if(req.body.filterLast30) {
                filterDateRangeStart = new Date().setDate(new Date().getDate() - 30);
            }
            if(req.body.filterLastYear) {
                let today = new Date();
                const oneYearAgo = new Date().setFullYear(today.getFullYear() - 1)
                const oneYearOneMonthAgo = new Date().setFullYear(today.getMonth() - 13);
                filterDateRangeStart = oneYearOneMonthAgo;
                filterDateRangeEnd = oneYearAgo;
            }            
            const payorSorted = await Transaction
            .aggregate([
                {
                $match: { //find the following with all conditions true
                    $and: [
                    {
                        user: new mongoose.Types.ObjectId(req.user.id)
                    },
                    {
                        date: {
                        $gte: new Date(filterDateRangeStart)
                        }
                    },
                    {
                        date: {
                        $lte: new Date(filterDateRangeEnd)
                        }
                    }
                    ]
                } 
                },
                {
                    $group: {
                        _id:  "$payor",
                        total: { $sum: "$amount" }
                    }         
                },
                {
                    $sort: {
                        total: -1
                    }
                },
                {
                    $lookup: {
                        from: "entities",
                        localField: "_id",
                        foreignField: "_id",
                        as: "payor"
                    }
                },
                {
                    $unwind: "$payor"
                },
                {
                    $project: {
                        payor: "$payor.name",
                        total: "$total",
                    }
                },
            ]);
            const payeeSorted = await Transaction
            .aggregate([
                {
                $match: { //find the following with all conditions true
                    $and: [
                    {
                        user: new mongoose.Types.ObjectId(req.user.id)
                    },
                    {
                        date: {
                        $gte: new Date(filterDateRangeStart)
                        }
                    },
                    {
                        date: {
                        $lte: new Date(filterDateRangeEnd)
                        }
                    }
                    ]
                } 
                },
                {
                    $group: {
                        _id:  "$payee",
                        total: { $sum: "$amount" }
                    }         
                },
                {
                    $sort: {
                        total: -1
                    }
                },
                {
                    $lookup: {
                        from: "entities",
                        localField: "_id",
                        foreignField: "_id",
                        as: "payee"
                    }
                },
                {
                    $unwind: "$payee"
                },
                {
                    $project: {
                        payee: "$payee.name",
                        total: "$total",
                    }
                },
            ]);
            const accountSorted = await Transaction
            .aggregate([
                {
                $match: { //find the following with all conditions true
                    $and: [
                    {
                        user: new mongoose.Types.ObjectId(req.user.id)
                    },
                    {
                        date: {
                        $gte: new Date(filterDateRangeStart)
                        }
                    },
                    {
                        date: {
                        $lte: new Date(filterDateRangeEnd)
                        }
                    }
                    ]
                } 
                },
                {
                    $group: {
                        _id:  "$account",
                        total: { $sum: "$amount" }
                    }         
                },
                {
                    $sort: {
                        total: -1
                    }
                },
                {
                    $lookup: {
                        from: "accounts",
                        localField: "_id",
                        foreignField: "_id",
                        as: "account"
                    }
                },
                {
                    $unwind: "$account"
                },
                {
                    $project: {
                        account: "$account.name",
                        total: "$total",
                    }
                },
            ]);
            const calculateTotal = (sorted) => {
                return sorted.reduce((acc, item) => item.total + acc, 0)
            }
            //console.log(transactions);
            console.log(payorSorted);
            console.log(payeeSorted);
            console.log(accountSorted);
            //console.log(total);
            res.render("dashboard.ejs", { 
                payorSorted: payorSorted, 
                payorTotal: calculateTotal(payorSorted), 
                payeeSorted: payeeSorted,
                payeeTotal: calculateTotal(payeeSorted),
                accountSorted: accountSorted,
                accountTotal: calculateTotal(accountSorted),
                user: req.user 
            });
        } catch(err) {
            console.error(err);
        }
    }
}