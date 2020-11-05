const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const router = require("./routes");
const app = express();
const cors = require("cors");
const controller = require("./controller");
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", router);

app.get("/", (req, res) => {
  res.render("base");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/overview", (req, res) => {
  res.render("overview", {
    user: "Rishi",
  });
});

/**
 * Basically if any request make it to this point that means router
 * did not catch the request in that case a nicely
 * formatted error would be given to user
 **/
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "Error",
    message: `Can't find the ${req.originalUrl} for this server`,
  });
});

module.exports = app;
