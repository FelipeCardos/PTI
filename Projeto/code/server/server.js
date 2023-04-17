const express = require("express");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
require("./src/controllers/auth/passport");
require("./src/controllers/auth/passportGoogleSSO");
const cookieSession = require("cookie-session");
const Paypal = require("paypal-rest-sdk");

const app = express();

Paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id: process.env.PAYPAL_ID,
  client_secret: process.env.PAYPAL_SECRET,
});

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);
// register regenerate & save after the cookieSession middleware initialization
app.use(function (request, response, next) {
  if (request.session && !request.session.regenerate) {
    request.session.regenerate = (cb) => {
      cb();
    };
  }
  if (request.session && !request.session.save) {
    request.session.save = (cb) => {
      cb();
    };
  }
  next();
});

app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Import routes
const userRoute = require("./src/routes/api/v1/v1.root");
app.use("/api/v1", userRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
