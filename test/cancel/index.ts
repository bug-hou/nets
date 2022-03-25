import nets, { Canceler } from "../../src";

nets.defaults.baseURL = "http://localhost:5000";

const CancelToken = nets.CancelToken;

nets.get("/test/get/timeout", {
}).then(res => {
  console.log(res);
}).catch(e => {
  if (nets.isCancel(e)) {
    console.log("Request canceled", e.message)
  }
})

let cancel: Canceler
nets.get("/test/get/timeout", {
  cancelToken: new CancelToken(c => {
    cancel = c
  })
}).then(res => {
  console.log(res)
}).catch(e => {
  // 我
  console.log("我是一个取消函数")
  console.dir(e)
})

setTimeout(() => {
  cancel();
}, 500);