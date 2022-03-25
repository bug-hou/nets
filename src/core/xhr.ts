import { INetsRequestConfig, INetsPromise, INetsResponseConfig } from "../types";

import { parseHeaders } from "../utils/headers";

import { createError } from "../utils/error";
import { isFormData, isURLSameOrigin } from "../utils/url";
import cookie from "../utils/cookie";

export default function xhr<T>(config: INetsRequestConfig): INetsPromise<T> {
  return new Promise((resolve, reject) => {
    // 对象解构
    let { data, method = "GET", url, baseURL, headers = {},
      responseType, timeout, cancelToken, withCredentials,
      xsrfCookieName, xsrfHeaderName, onDownloadProgress,
      onUploadProgress, auth, validateStatus } = config;

    // 实例化xhr
    const request = new XMLHttpRequest();
    // 对配置参数进行处理
    configurable();
    // 打开一个请求连接
    request.open(method?.toUpperCase(), url, true);
    // 处理请求头，并且注册到request中
    processHeader();

    // const fd = new FormData();
    // fd.append("bughou", "fksdfljwegio")
    // 发送请求
    request.send(data);

    processCancel();

    // 注册事件
    addEvents();

    function configurable() {
      /* 
      1.baseURL存在并且为http://www.bughou.com/值，url为/post/... =>对url的/删去
      2.baseURL存在并且为http://www.bughou.com值，url为post/... =>添加一个/
      3.baseURL存在并且为http://www.bughou.com/值，url为post/... =>正常添加
      */
      const isIntactUrl = /(^[a-z][a-z0-9]*)?:\/\//.test(url);
      if (!isIntactUrl) {
        if (baseURL) {
          if (baseURL[baseURL.length] === "/" && url[0] === "/") {
            url = baseURL + url.slice(1)
          } else if (url[0] !== "/") {
            url = baseURL + "/" + url;
          } else {
            url = baseURL + url
          }
        }
      }
      if (timeout) {
        request.timeout = timeout;
      }
      if (responseType) {
        request.responseType = responseType;
      }
      if (withCredentials) {
        request.withCredentials = withCredentials;
      }
      if ((withCredentials || isURLSameOrigin(url)) && xsrfCookieName) {
        const xsrfValue: string | null = cookie.read(xsrfCookieName)
        if (xsrfValue && xsrfHeaderName) {
          headers[xsrfHeaderName] = xsrfValue
        }
        // function getCookie(name){ return document.cookie.match(new RegExp(".*?(;?\\s*)(" + name + ") = ([^;]*)"))}
      }
      if (auth) {
        headers["Authorization"] = "Basic " + auth;
      }
    }

    function processHeader() {
      Object.keys(headers).forEach(name => {
        if (data === null && name.toLowerCase() === "content-type") {
          return
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })
    }

    function processCancel() {
      // 取消操作
      if (cancelToken) {
        cancelToken.promise.then(reason => {
          request.abort();
          reject(reason);
        })
      }

      if (isFormData(data)) {
        delete headers["Content-Type"]
      }
    }

    function addEvents() {
      request.onreadystatechange = e => {
        if (request.readyState !== 4) {
          return;
        }
        const status = request.status;
        if (!status) {
          return;
        }
        const responseHeaders = request.getAllResponseHeaders();
        const responseData = request.response;

        const response: INetsResponseConfig = {
          status,
          data: responseData,
          headers: parseHeaders(responseHeaders),
          config,
          request,
          statusText: request.statusText
        }
        if (validateStatus && validateStatus(status)) {
          resolve(response)
        } else if (status >= 200 && status < 300) {
          resolve(response);
        } else {
          reject(createError("request failed with status code", config, null, request, response))
        }
      }

      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }
      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }

      request.onerror = (e) => {
        reject(createError("Netword Error", config, null, request))
      }

      request.ontimeout = () => {
        reject(createError(`Timeout of ${timeout} ms `, config, "ECONNNABORTED", request))
      }
    }
  })
}
