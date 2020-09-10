const express = require("express");
const router = express.Router();

router.get("/:month/:year", (req, res) => {
  res.send(
    "Your request year " +
      req.params.year +
      " and month " +
      req.params.month +
      " and sort by " +
      req.query.sortBy
  );
});

module.exports = router;
