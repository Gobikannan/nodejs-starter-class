function log(req, res, next) {
  console.log("api request hit...loggin..");
  next();
}

module.exports = log;
