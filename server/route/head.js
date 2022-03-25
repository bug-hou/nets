const express = require("express");

const route = express.Router();

route.head("/test/head/string", (req, res, next) => {
  const info = {
    name: "bughou",
    age: 18,
    type: "string"
  }
  res.status(200);
  res.send(JSON.stringify(info))
})

route.head("/test/head/json", (req, res, next) => {
  const info = {
    name: "bughou",
    age: 18,
    type: "json"
  }
  res.status(200);
  // res.send(JSON.stringify(info))
  res.json(info)
})

route.head("/test/head/error", (req, res, next) => {
  const info = {
    name: "bughou",
    age: 18,
    type: "error"
  }
  res.status(401);
  res.send(JSON.stringify(info))
})

route.head("/test/head/timeout", (req, res, next) => {
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