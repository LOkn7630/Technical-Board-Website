const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const mongoSanitize = require("express-mongo-sanitize");

const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const bodyParser = require("body-parser");

const flash = require("connect-flash");
const app= express();
const helmet = require("helmet");
require("dotenv").config();
// const  {MONGO_URL} = process.env;
// const url = "mongodb://localhost:27017/TECH_db";
// console.log(MONGO_URL);
const PORT = process.env.PORT || 8080;

require("./config/passport")(passport);

mongoose
  .connect('mongodb://localhost:27017/TECH_db', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Successful DB connection"))
  .catch((err) => console.log(err.message));

const homeRoutes = require("./routes/home.routes");
const adminRoutes = require("./routes/admin.routes");
const announcementRoutes = require("./routes/announcement.routes");
const noticeRoutes = require("./routes/notice.routes");
const teamRoutes = require("./routes/team.routes");

app.use("/sa/techboard/", express.static(__dirname + "/public"));
app.use("/sa/techboard/uploads", express.static(__dirname + "/uploads"));


app.use(
  bodyParser.json({
    limit: "50mb",
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(methodOverride("_method"));
app.use(mongoSanitize());
app.use(flash());

// SESSION MIDDLEWARE
app.use(
  session({
    secret: "techboard",
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 180 * 60 * 1000 },
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.info = req.flash("info");
  next();
});



app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.session = req.session;
  next();
});

app.set("view engine", "ejs");

app.use("/sa/techboard", homeRoutes);
app.use("/sa/techboard/admin", adminRoutes);
app.use("/sa/techboard/admin/announcement", announcementRoutes);
app.use("/sa/techboard/admin/notice", noticeRoutes)
app.use("/sa/techboard/admin/team", teamRoutes);

app.use(helmet({ contentSecurityPolicy: false }));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
  