import nets from "../../src";

nets.defaults.baseURL = "http://localhost:5000"

nets.get("/test/get/string", {
  auth: "buhgou123456"
}).then(res => {
  console.log(res)
})

nets.get("/test/get/error", {
  auth: "buhgou123456",
  validateStatus(n) {
    return true
  }
}).then(res => {
  console.log(res)
})