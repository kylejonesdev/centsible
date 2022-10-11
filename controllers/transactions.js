const cloudinary = require("../middleware/cloudinary");
const mongoose = require("mongoose");
const Transaction = require("../models/Transaction");
const Entity = require("../models/Entity")
const Account = require("../models/Account")

module.exports = {
  getTransactions: async (req, res) => {
    //Initialize all filters and sorts to default values
    let filterDateRangeStart = 0
    let filterDateRangeEnd =  Date.now();
    let filterSortByAndDirection = { date: -1 };    

    //Get filter values from client if they are provided
    if(req.body.filterDateRangeStart) {
      filterDateRangeStart = req.body.filterDateRangeStart
    }
    if(req.body.filterDateRangeEnd) {
      filterDateRangeEnd = req.body.filterDateRangeEnd
    }
    if(req.body.filterSortBy || req.body.filterSortDirection) {
      filterSortByAndDirection = { [req.body.filterSortBy]: +req.body.filterSortDirection };
    }
    try {
      const transactions = await Transaction
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
            income: "$income",
            expense: "$expense",
          }
        },
        {
          $sort: filterSortByAndDirection //sort the query results by the order submitted in the filters form
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
      const calculateTotal = (arr, transactionField) => {
        //console.log(transactionField);
        return arr.reduce((acc, item) => {
          //console.log(item[transactionField]);
          return acc + item[transactionField]
        }, 0);
      }
      if(!entities.length) {
        console.log("Creating example entities.");
        createExampleEntities(req);
      }
      if(!accounts.length) {
        console.log("Creating example accounts.");
        createExampleAccounts(req);
      }
      console.log(transactions);
      res.render("transactions.ejs", {
        transactions: transactions, 
        totalIncome: calculateTotal(transactions, "income"), 
        totalExpense: calculateTotal(transactions, "expense"), 
        entities: entities, 
        accounts: accounts,
        filterQuickDate: req.body.filterQuickDate,
        filterDateRangeStart: filterDateRangeStart,
        filterDateRangeEnd: filterDateRangeEnd,
        user: req.user});
    } catch(err) {
      console.error(err);
    }
  },
  getTransaction: async (req, res) => {
    try {
      const transaction = await Transaction
      .aggregate([
        {
          $match: { //find the following with all conditions true
            $and: [
              {
                user: new mongoose.Types.ObjectId(req.user.id)
              },
              {
                _id: new mongoose.Types.ObjectId(req.params.id)
              },
            ]
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
            income: "$income",
            expense: "$expense",
            description: "$description",
            imageId: "$imageId",
            imageURL: "$imageURL"
          }
        },
      ]);
      const entities = await Entity.find({ user:req.user.id });
      const accounts = await Account.find({ user:req.user.id });
      console.log(transaction[0]);
      res.render("transaction.ejs", { transaction: transaction[0], entities: entities, accounts: accounts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createTransaction: async (req, res) => {
    try {
      //Error Checking
      const errorMessages = [];
      if(!req.body.date) {
        errorMessages.push({msg: "Date is required."});
      }
      if(!req.body.payee) {
        errorMessages.push({msg: "Payee is required."});
      }
      if(!req.body.type) {
        errorMessages.push({msg: "Please select income or expense."});
      }
      if(!req.body.amount) {
        errorMessages.push({msg: "Amount is required."});
      }
      if(errorMessages.length) {
        req.flash("errors", errorMessages);
        console.log(errorMessages);
        res.redirect("/transactions");
      }
      if(!errorMessages.length) {
        //Create Transaction
        let incomeAmount = 0;
        let expenseAmount = 0;    
        if(req.body.type === "Income") { //put user provided amount in correct field
          incomeAmount = req.body.amount;
        } else if (req.body.type === "Expense") {
          expenseAmount = req.body.amount;
        }
        if(req.file !== undefined) { //if documentation file is attached
          const cloudinaryResult = await cloudinary.uploader.upload(req.file.path); // Upload image to cloudinary
          await Transaction.create({
            user: req.user.id,
            date: req.body.date,
            payee: req.body.payee,
            type: req.body.type,
            account: req.body.account,
            income: incomeAmount,
            expense: expenseAmount,
            description: req.body.description,
            imageId: cloudinaryResult.public_id,
            imageURL: cloudinaryResult.secure_url,
          });
          console.log(`Add transaction for user ${req.user.id}. Cloudinary image ID: ${cloudinaryResult.public_id}.`)
        } else { //if no documentation is found
          await Transaction.create({
            user: req.user.id,
            date: req.body.date,
            payee: req.body.payee,
            type: req.body.type,
            account: req.body.account,
            income: incomeAmount,
            expense: expenseAmount,
            description: req.body.description,
          });
          console.log(`Add transaction for user ${req.user.id}. No image.`)
        }
        res.redirect("/transactions");              
      }
    } catch (err) {
      console.log(err);
    }
  },
  updateTransaction: async (req, res) => {
    try {
      let incomeAmount = 0;
      let expenseAmount = 0;    
      if(req.body.type === "Income") {
        incomeAmount = req.body.amount;
      } else if (req.body.type === "Expense") {
        expenseAmount = req.body.amount;
      }
      if(req.file !== undefined) { //if transaction has an attached document
        const cloudinaryResult = await cloudinary.uploader.upload(req.file.path);
        await Transaction.findOneAndUpdate(
          { _id: req.params.id },
          {
            _id: req.params.id,
            user: req.user.id,
            date: req.body.date,
            payee: req.body.payee,
            type: req.body.type,
            account: req.body.account,
            income: incomeAmount,
            expense: expenseAmount,
            description: req.body.description,
            imageId: cloudinaryResult.public_id,
            imageURL: cloudinaryResult.secure_url,  
          }
        );
      } else { //if there is no document attached
        await Transaction.findOneAndUpdate(
          { _id: req.params.id },
          {
            _id: req.params.id,
            user: req.user.id,
            date: req.body.date,
            payee: req.body.payee,
            type: req.body.type,
            account: req.body.account,
            income: incomeAmount,
            expense: expenseAmount,
            description: req.body.description,
          }
        );
      }
      console.log("Updated transaction: " + req.params.id);
      res.redirect(`/transactions/${req.params.id}`);
    } catch (err) {
      console.error(err);
    }
  },
  deleteTransaction: async (req, res) => {
    try {
      let transaction = await Transaction.findById({ _id: req.params.id });
      // Delete image from cloudinary
// @TODO Delete image from cloud not working.
      if (transaction.imageId) {
        await cloudinary.uploader.destroy(transaction.imageId);
      }
      // Delete transaction from db
      await Transaction.deleteOne({ _id: req.params.id });
      console.log("Deleted transaction.");
      res.redirect("/transactions");
    } catch (err) {
      console.log("Oops");
      console.error(err);
      res.redirect("/transactions");
    }
  },
};
