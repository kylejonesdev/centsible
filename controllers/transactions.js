const cloudinary = require("../middleware/cloudinary");
const mongoose = require("mongoose");
const Transaction = require("../models/Transaction");
const Entity = require("../models/Entity")
const Account = require("../models/Account")

module.exports = {
  getTransactions: async (req, res) => {
    //Sort Order
    // let sortOrder = req.params.sortOrder;
    // switch(sortOrder) {
    //     case 'date':
    //         sortOrder = { date: 1 }
    //         break;
    //     case 'payor':
    //         sortOrder = { payor: 1 }
    //         break;
    //     case 'payee':
    //         sortOrder = { payee: 1 }
    //         break;
    //     case 'account':
    //         sortOrder = { account: 1 }
    //         break;
    //     case 'amount':
    //         sortOrder = { amount: -1 }
    //         break;
    //     default:
    //         sortOrder = { date: -1 }
    // }
    //Initialize all filters to default values
    let filterSortByAndDirection = { date: -1 };    
    let filterDateRangeStart = 0
    let filterDateRangeEnd =  Date.now();

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
    console.log(`Date range start: ${filterDateRangeStart}`);
    console.log(`Date range end: ${filterDateRangeEnd}`);
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
          $lookup: { //join entities collection to payor id to get the payor name
            from: "entities",
            localField: "payor",
            foreignField: "_id",
            as: "payor"
          }
        },
        {
          $unwind: "$payor" //remove the joined object from the returned array
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
            payor: "$payor.name",
            payee: "$payee.name",
            account: "$account.name",
            amount: "$amount"
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
      const total = transactions
        .reduce((acc, item) => {
          return acc + item.amount;
        }, 0);
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
      res.render("transactions.ejs", {transactions: transactions, entities: entities, accounts: accounts, user: req.user, total: total});
    } catch(err) {
      console.error(err);
    }
  },
  getTransaction: async (req, res) => {
    try {
      const transaction = await Transaction
      .findById(req.params.id)
      .populate([
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
        }
      ]);
      const entities = await Entity.find();
      const accounts = await Account.find();
      res.render("transaction.ejs", { transaction: transaction, entities: entities, accounts: accounts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createTransaction: async (req, res) => {
    try {

      //Error Checking
      const errorMessages = [];
      if(!req.body.payor) {
        errorMessages.push({msg: "Payor is required."});
      }
      if(!req.body.payee) {
        errorMessages.push({msg: "Payee is required."});
      }
      if(!req.body.date) {
        errorMessages.push({msg: "Date is required."});
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
        if(req.file !== undefined) {
          const cloudinaryResult = await cloudinary.uploader.upload(req.file.path); // Upload image to cloudinary
          await Transaction.create({
            user: req.user.id,
            payor: req.body.payor,
            payee: req.body.payee,
            date: req.body.date,
            account: req.body.account,
            amount: req.body.amount,
            description: req.body.description,
            imageId: cloudinaryResult.public_id,
            imageURL: cloudinaryResult.secure_url,
          });
          console.log(`Add transaction for user ${req.user.id}. Cloudinary image ID: ${cloudinaryResult.public_id}.`)
        } else {
          await Transaction.create({
            user: req.user.id,
            payor: req.body.payor,
            payee: req.body.payee,
            date: req.body.date,
            account: req.body.account,
            amount: req.body.amount,
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
    console.log(req.params.id);
    try {
      if(req.file !== undefined) {
        const cloudinaryResult = await cloudinary.uploader.upload(req.file.path);
        await Transaction.findOneAndUpdate(
          { _id: req.params.id },
          {
            _id: req.params.id,
            user: req.user.id,
            payor: req.body.payor,
            payee: req.body.payee,
            date: req.body.date,
            account: req.body.account,
            amount: req.body.amount,
            description: req.body.description,
            imageId: cloudinaryResult.public_id,
            imageURL: cloudinaryResult.secure_url,  
          }
        );
      } else {
        await Transaction.findOneAndUpdate(
          { _id: req.params.id },
          {
            _id: req.params.id,
            user: req.user.id,
            payor: req.body.payor,
            payee: req.body.payee,
            date: req.body.date,
            account: req.body.account,
            amount: req.body.amount,
            description: req.body.description,
          }
        );
      }
      console.log(req.params.id);
      console.log("Transaction updated.");
      res.redirect(`/transactions/${req.params.id}`);
    } catch (err) {
      console.error(err);
    }
  },
  deleteTransaction: async (req, res) => {
    try {
      // Find transaction by id
      let transaction = await Transaction.findById({ _id: req.params.id });
      // Delete image from cloudinary
// @TODO Delete image from cloud not working.
      if (transaction.imageId) {
        await cloudinary.uploader.destroy(transaction.imageId);
      }
      // Delete transaction from db
      await Transaction.deleteOne({ _id: req.params.id });
      console.log("Deleted transaction.");
      res.redirect("/reports/dashboard");
    } catch (err) {
      console.log("Oops");
      console.error(err);
      res.redirect("/reports/dashboard");
    }
  },
};
