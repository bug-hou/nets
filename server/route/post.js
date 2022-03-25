const express = require("express");
const fs = require("fs");
const { resolve } = require("path");

const route = express.Router();

route.post("/test/post/string", (req, res, next) => {
  const info = {
    name: "bughou",
    age: 18,
    type: "string"
  }
  res.status(200);
  res.send(JSON.stringify(info))
})

route.post("/test/post/json", (req, res, next) => {
  const info = {
    name: "bughou",
    age: 18,
    type: "json"
  }
  res.status(200);
  // res.send(JSON.stringify(info))
  res.json(info)
})

route.post("/test/post/error", (req, res, next) => {
  const info = {
    name: "bughou",
    age: 18,
    type: "error"
  }
  res.status(401);
  res.send(JSON.stringify(info))
})

route.post("/test/post/timeout", (req, res, next) => {
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

route.post("/test/post/data", (req, res, next) => {
  const body = req.body;
  res.status(200);
  res.send(body);
})

route.post("/test/post/update", (req, res, next) => {

  const file = req.fields; // 非文件项
  fs.promises.writeFile(resolve(__dirname, "./update"), file);

  console.log(file)

  res.json({
    message: "发送完毕"
  })
  // req.files; // 文件项
})


module.exports = route;