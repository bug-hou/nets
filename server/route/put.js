const express = require("express");

const route = express.Router();

route.put("/test/put/string", (req, res, next) => {
  const info = {
    name: "bughou",
    age: 18,
    type: "string"
  }
  res.status(200);
  res.send(JSON.stringify(info))
})

route.put("/test/put/json", (req, res, next) => {
  const info = {
    name: "bughou",
    age: 18,
    type: "json"
  }
  res.status(200);
  // res.send(JSON.stringify(info))
  res.json(info)
})

route.put("/test/put/error", (req, res, next) => {
  const info = {
    name: "bughou",
    age: 18,
    type: "error"
  }
  res.status(401);
  res.send(JSON.stringify(info))
})

route.put("/test/put/timeout", (req, res, next) => {
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

route.put("/test/put/data", (req, res, next) => {
  const body = req.body;
  res.status(200);
  res.send(body)
})


module.exports = route;