// 处理config文件
import { INetsPromise, INetsRequestConfig, INetsResponseConfig } from "../types/index"

import xhr from "./xhr";
import { buildUrl } from "../utils/url";
import { transformRequest, transformResponse as transformResponseData } from "../utils/data";
import { processHeaders } from "../utils/headers";

import { transform } from "./transform"

function processConfig(config: INetsRequestConfig): void {
  config.url = transformUrl(config);
  config.data = transform(config.data, config.headers, config.transformRequest);
  config.headers = transformHeaders(config);
  config.data = transformData(config)
}
// 处理url
function transformUrl(config: INetsRequestConfig) {
  return buildUrl(config.url, config.params, config.paramsSerializer)
}
// 处理data数据
function transformData(config: INetsRequestConfig): any {
  return transformRequest(config.data)
}
// 处理headers
function transformHeaders(config: INetsRequestConfig) {
  const { headers = {}, data } = config;
  return processHeaders(headers, data);
}
// 处理返回的数据
function transformResponse(config: INetsResponseConfig) {
  return transformResponseData(config);
}

function throwIfCancellationRequested(config: INetsRequestConfig) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

export function dispatchRequest<T>(config: INetsRequestConfig): INetsPromise<T> {
  throwIfCancellationRequested(config);
  processConfig(config)
  return xhr<T>(config).then(
    res => {
      return transformResponse(res)
    },
    e => {
      if (e && e.response) {
        e.response = transformResponseData(e.response)
      }
      return Promise.reject(e)
    }
  )
}