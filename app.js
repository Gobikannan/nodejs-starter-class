// debugging
const startupDebugger = require("debug")("app:startup"); // set DEBUG=app:startup
const databaseDebugger = require("debug")("app:db"); // set DEBUG=app:db

const express = require("express");
const helmet = require("helmet");
const app = express();

const morgan = require("morgan");
const logger = require("./middleware/logger");
const config = require("config");

const courses = require("./routes/courses");
const home = require("./routes/home");
const posts = require("./routes/posts");
const authenticater = require("./middleware/authenticater");

console.log(`NODE_ENV: ${process.env}`);
console.log(`APP NODE_ENV: ${app.get("env")}`);

// configuration
console.log("Application Name: " + config.get("name"));
console.log("Mail host: " + config.get("mail.host"));
console.log("Mail password: " + config.get("mail.password")); // custom-environment-variables.json and then do => set app_password=1234

app.use(helmet());

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("morgan enabled");
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(logger);
app.use(authenticater);

app.use("/api/courses", courses);
app.use("/api/posts", posts);
app.use("/", home);

// set env varriable as 'set PORT=5001' on windows in command line
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App is listening on Port ${port}`);
});
