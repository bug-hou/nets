const express = require("express");
const bodyParser = require("body-parser")
const registerRoute = require("./route/index")
const formidable = require("express-formidable");

const app = express();


app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080'); //当允许携带cookies此处的白名单不能写’*’
  res.header('Access-Control-Allow-Headers', '*'); //允许的请求头
  // res.header("Access-Control-Allow-Headers", "Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE");; //允许的请求方法
  res.header("Access-Control-Allow-Credentials", "*")
  res.header('Access-Control-Allow-Credentials', true);  //允许携带cookies
  next();
});

app.all("*", bodyParser.urlencoded({ extended: false }), bodyParser.json(), formidable())

registerRoute.call(app);

app.listen(5000, () => {
  console.log("服务器开启")
})