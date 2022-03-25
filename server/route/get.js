const express = require("express");

const route = express.Router();

route.get("/test/get/string", (req, res, next) => {
  const info = {
    name: "bughou",
    age: 18,
    type: "string"
  }
  res.status(200);
  res.send(JSON.stringify(info))
})

route.get("/test/get/json", (req, res, next) => {
  const info = {
    name: "bughou",
    age: 18,
    type: "json"
  }
  res.status(200);
  // res.send(JSON.stringify(info))
  res.json(info)
})

route.get("/test/get/error", (req, res, next) => {
  const info = {
    name: "bughou",
    age: 18,
    type: "error"
  }
  res.status(401);
  res.send(JSON.stringify(info))
})

route.get("/test/get/timeout", (req, res, next) => {
  const info = {
    name: "bughou",
    age: 18,
    type: "timeout"
  }
  setTimeout(() => {
    res.status(200);
    res.send(JSON.stringify(info))
  }, 1000)
})

route.get("/test/get/data", (req, res, next) => {
  const body = req.query;
  console.log(body)
  res.status(200);
  res.send(body);
})

route.get("/test/get/xsrf", (req, res, next) => {
  res.cookie("XSRF-COOKIE", "bughou-monkey")
  res.setHeader("XSRF-HEADER", "bughou123")
  const body = req.query;
  res.status(200);
  res.send(body);
})

module.exports = route;