import nets from "../../src";

nets.defaults.BASE_URL = "http://localhost:5000"

const fs = new FormData();

fs.append("bughou", '非节水看到了非换行')

nets.post("/test/post/update", fs).then(res => {
  console.log(res)
})

const button = document.querySelector("button")
const input = document.querySelector("input")

button!.addEventListener("click", (e) => {
  const file = input!.files![0];
  const fd = new FormData();
  fd.append("bughou", file)
  nets.post("/test/post/update", fd, {
    // headers: {
    //   "content-type": "multipart/form-data;"
    // }
  }).then(res => {
    console.log(res)
  })
})