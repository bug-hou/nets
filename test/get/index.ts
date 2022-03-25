import nets from "../../src";

nets.defaults.BASE_URL = "http://localhost:5000";

interface Result {
  name: string,
  age: number
}


nets.get<Result>("test/get/string").then(res => {
  console.log(res.data.name)
})

nets.get("test/get/json").then(res => {
  console.log(res)
})

nets.get("test/get/error").then(res => {
  console.log(res)
}).catch(error => {
  console.log(error)
})

nets.get("test/get/timeout",
  {
    timeout: 3000
  }).then(res => {
    console.log(res)
  }).catch(error => {
    console.log(error)
  })

nets.get("test/get/string1").then(res => {
  console.log(res)
}).catch(error => {
  console.log(error)
})