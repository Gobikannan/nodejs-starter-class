const express = require("express");
const Joi = require("joi");

const router = express.Router();

const courses = [
  {
    id: 1,
    name: "course 1",
  },
  {
    id: 2,
    name: "course 2",
  },
  {
    id: 3,
    name: "course 3",
  },
];

router.get("/", (req, res) => {
  res.send(courses);
});

router.get("/:id", (req, res) => {
  const course = courses.find((x) => x.id === req.params.id);
  res.send(course);
});

router.post("/", (req, res) => {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  const result = Joi.isError(req.body, schema);

  if (result) {
    res.status(400).send(result.error);
    return;
  }

  res.send(req.body);
});

module.exports = router;
