import { INetsRequestConfig } from "../types"

const defaults: INetsRequestConfig = {
  method: "GET",
  timeout: 5000,
  headers: {
    // common: {
    Accept: "application/json,text/plain,*/*",
    // }
  },
  withCredentials: false,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  validateStatus(n: number) {
    if (200 <= n && n < 300) {
      return true;
    }
    return false
  }
}

// const methodsNoData = ["delete", "get", "head", "options"]

// methodsNoData.forEach(method => {
//   defaults.headers[method] = {}
// })

// const methodsWithData = ["post", "put", "patch"]

// methodsWithData.forEach(method => {
//   defaults.headers[method] = {
//     'content-type': "application/x-www-form-urlencoded"
//   }
// })

export default defaults