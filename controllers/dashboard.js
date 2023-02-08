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
            let payeeSortByAndDirection = { payee: 1 };
            let accountSortByAndDirection = { account: 1 };
            //Get filter values from client if they are provided
            if(req.body.filterDateRangeStart) {
                filterDateRangeStart = req.body.filterDateRangeStart;
            }
            if(req.body.filterDateRangeEnd) {
                filterDateRangeEnd = req.body.filterDateRangeEnd;
            }
            if(req.body.filterSortBy || req.body.filterSortDirection) {
                let payeeSortBy = req.body.filterSortBy;
                let accountSortBy = req.body.filterSortBy;
                if (req.body.filterSortBy === 'name') {
                    payeeSortBy = "payee";
                    accountSortBy = "account";                        
                }
                payeeSortByAndDirection = { [payeeSortBy]: +req.body.filterSortDirection };
                accountSortByAndDirection = { [accountSortBy]: +req.body.filterSortDirection };
            }
            // if(req.body.filterQuickDate === 'filterLast30') {
            //     filterDateRangeStart = new Date().setDate(new Date().getDate() - 30);
            // }
            // if(req.body.filterQuickDate === 'filterLastYear') {
            //     let today = new Date();
            //     const oneYearAgo = new Date().setFullYear(today.getFullYear() - 1)
            //     const oneYearOneMonthAgo = new Date().setFullYear(today.getMonth() - 13);
            //     filterDateRangeStart = oneYearOneMonthAgo;
            //     filterDateRangeEnd = oneYearAgo;
            // }            
            const payeeSorted = await Transaction
            .aggregate([
                {
                    $match: {
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
                    $lookup: {
                        from: "entities",
                        localField: "payee",
                        foreignField: "_id",
                        as: "payee"
                    }
                },
                {
                    $unwind: "$payee"
                },
                {
                    $project: {
                        payeeId: "$payee._id",
                        payee: "$payee.name",
                        income: "$income",
                        expense: "$expense",
                    }
                },
                {
                    $group: {
                        _id:  "$payeeId",
                        payee: {
                            $first: "$payee"
                        },
                        totalIncome: {
                            $sum: "$income"
                        },
                        totalExpense: {
                            $sum: "$expense"
                        }
                    }                        
                },
                {
                    $sort: payeeSortByAndDirection
                },
            ]);
            const accountSorted = await Transaction
            .aggregate([
                {
                    $match: {
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
                    $lookup: {
                        from: "accounts",
                        localField: "account",
                        foreignField: "_id",
                        as: "account"
                    }
                },
                {
                    $unwind: "$account"
                },
                {
                    $project: {
                        accountId: "$account._id",
                        account: "$account.name",
                        income: "$income",
                        expense: "$expense",
                    }
                },
                {
                    $group: {
                        _id:  "$accountId",
                        account: {
                            $first: "$account"
                        },
                        totalIncome: {
                            $sum: "$income"
                        },
                        totalExpense: {
                            $sum: "$expense"
                        }
                    }                        
                },
                {
                    $sort: accountSortByAndDirection
                },
            ]);
            const calculateTotal = (arr, transactionField) => {
                return arr.reduce((acc, item) => {
                  return acc + item[transactionField]
                }, 0);
            }
            res.send({ 
                payeeSorted: payeeSorted,
                payeeAllIncome: calculateTotal(payeeSorted, "totalIncome"),
                payeeAllExpense: calculateTotal(payeeSorted, "totalExpense"),
                accountSorted: accountSorted,
                accountAllIncome: calculateTotal(accountSorted, "totalIncome"),
                accountAllExpense: calculateTotal(accountSorted, "totalExpense"),
                //filterQuickDate: req.body.filterQuickDate,
                filterDateRangeStart: filterDateRangeStart,
                filterDateRangeEnd: filterDateRangeEnd,
                user: req.user 
            });
        } catch(err) {
            console.error(err);
        }
    }
}