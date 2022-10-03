// const Transaction = require("../models/Transaction");
// const Entity = require("../models/Entity");
// const Account = require("../models/Account")

module.exports = {
    getDashboard: async (req, res) => {
        try {
            res.render("dashboard.ejs", { user: req.user });
        } catch(err) {
            console.error(err);
        }
        
    }
}