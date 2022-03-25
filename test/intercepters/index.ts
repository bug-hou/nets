import nets from "../../src";

nets.defaults.BASE_URL = "http://localhost:5000";

nets.defaults.headers.test = "bughou";


nets.interceptors.request.use((config) => {
  // config.headers.test += 1;
  return config
})

nets.interceptors.request.use((config) => {
  // config.headers.test += 2;
  return config
})
const id3 = nets.interceptors.request.use((config) => {
  // config.headers.test += 3;
  return config
})
nets.interceptors.request.use((config) => {
  // config.headers.test += 4;
  return config
})

nets.interceptors.request.eject(id3);

nets.interceptors.response.use((config) => {
  config.data.bughou = "最强"
  return config;
})
nets.interceptors.response.use((config: any) => {
  return config.data;
})

nets.post("/test/post/string", null, {
  responseType: "text",
  headers: {
    name: "jfskdiehgiowehgi"
  },
  params: {
    name: "bughou"
  },
  method: "GET"
}).then(res => {
  console.log(res)
}, (err) => {
  console.log(err)
})