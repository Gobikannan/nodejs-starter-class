function authenticater(req, res, next) {
  console.log("api authenticating...");
  next();
}

module.exports = authenticater;
