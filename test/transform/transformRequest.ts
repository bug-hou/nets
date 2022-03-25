import qs from "qs";
import nets from "../../src";

nets.defaults.BASE_URL = "http://localhost:5000";

nets.defaults.transformRequest = (data, headers) => {
  return qs.stringify(data);
}

nets.post("/test/post/string", {
  age: 18,
  name: "侯向毅"
}).then(res => {
  console.log(res.data)
}).catch(e => {
  console.log(e)
})