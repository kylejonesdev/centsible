const cloudinary = require("../middleware/cloudinary");
const Transaction = require("../models/Transaction");
const Entity = require("../models/Entity")
const Account = require("../models/Account")

module.exports = {
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
        res.redirect("/reports/dashboard");
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
        res.redirect("/reports/dashboard");              
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
