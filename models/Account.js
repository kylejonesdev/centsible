const mongoose = require("mongoose");

const AccountSchema = mongoose.Schema(
    {
        name:
        {
            type: String,
            required: true
        },
        number:
        {
            type: String,
            required: true
        },
        description:
        {
            type: String
        },
        user:
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        createdAt:
        {
            type: Date,
            default: Date.now(),
            required: true
        },
    }
)

module.exports = mongoose.model("Account", AccountSchema);