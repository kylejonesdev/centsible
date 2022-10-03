const mongoose = require('mongoose');

const TransactionSchema = mongoose.Schema( {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    payor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Entity'
    },
    payee: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Entity'
    },
    date: {
        type: String,
        required: true
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    },
    imageId: {
        type: String
    },
    imageURL: {
        type: String
    }
})

module.exports = mongoose.model("Transaction", TransactionSchema);