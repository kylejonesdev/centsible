const mongoose = require('mongoose');

const TransactionSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    payee: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Entity'
    },
    type: {
        type: String,
        enum: ['Income', 'Expense'],
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    income: {
        type: Number,
        required: true,
    },
    expense: {
        type: Number,
        required: true,
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