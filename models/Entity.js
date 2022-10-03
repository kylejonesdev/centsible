const mongoose = require('mongoose');

const EntitySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        street: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        country: {
            type: String
        },
        zip: {
            type: String
        },
        phone: {
            type: String
        },
        email: {
            type: String
        },
        notes: {
            type: String
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        createdAt: {
            type: Date,
            default: Date.now()
        },
    }
)

module.exports = mongoose.model("Entity", EntitySchema);