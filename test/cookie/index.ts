import nets from "../../src";

nets.defaults.baseURL = "http://localhost:5000"

document.cookie = "name=bughou;"

nets.get("/test/get/string", {
  withCredentials: true
}).then(res => {
  console.log(res)
})

nets.post("/test/post/string", {
  name: "bughou",
  age: 18,
  password: "hxy495921"
}, {
  withCredentials: true
}).then(res => {
  console.log(res)
})