import nets from "../../src";

nets.defaults.xsrfCookieName = "XSRF-COOKIE"
nets.defaults.xsrfHeaderName = "XSRF-HEADER"

nets.defaults.BASE_URL = "http://localhost:5000"

nets.get("test/get/xsrf", {
  params: {
    abc: "哈哈哈哈哈"
  }
}).then(res => {
  nets.post("/test/post/json").then(res => {
    console.log(res)
  })
})
