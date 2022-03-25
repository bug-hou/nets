const express = require("express");

const route = express.Router();

route.options("/test/options/string", (req, res, next) => {
  const info = {
    name: "bughou",
    age: 18,
    type: "string"
  }
  res.status(200);
  res.send(JSON.stringify(info))
})

route.options("/test/options/json", (req, res, next) => {
  const info = {
    name: "bughou",
    age: 18,
    type: "json"
  }
  res.status(200);
  // res.send(JSON.stringify(info))
  res.json(info)
})

route.options("/test/options/error", (req, res, next) => {
  const info = {
    name: "bughou",
    age: 18,
    type: "error"
  }
  res.status(401);
  res.send(JSON.stringify(info))
})

route.options("/test/options/timeout", (req, res, next) => {
  const info = {
    name: "bughou",
    age: 18,
    type: "timeout"
  }
  setTimeout(() => {
    res.status(200);
    res.send(JSON.stringify(info))
  }, 5000)
})


module.exports = route;