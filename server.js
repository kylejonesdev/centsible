const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const transactionRoutes = require("./routes/transactions");
const dashboardRoutes = require("./routes/dashboard");
const entitiesRoutes = require("./routes/entities");
const accountsRoutes = require("./routes/accounts");

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Connect to database
connectDB();

//EJS for views
app.set("view engine", "ejs");

//Static folder
app.use(express.static("public"));

//Body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages
app.use(flash());

//Routes
app.use("/", mainRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/transactions", transactionRoutes);
app.use("/entities", entitiesRoutes);
app.use("/accounts", accountsRoutes);

//Listening
app.listen(process.env.PORT, () => {
  console.log("Server is running on port: " + process.env.PORT);
});
