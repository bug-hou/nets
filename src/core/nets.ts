import { IMethod, INets, INetsPromise, INetsRequestConfig, INetsResponseConfig, RejectFn, ResolvedFn } from "../types/index"

import mergeWith from "../utils/merge";
import InterceptorManager from "./interceptor_manager"

import defaults from "./default"
import { dispatchRequest } from "./dispatchRequest"


interface Interceptor {
  request: InterceptorManager<INetsRequestConfig>
  response: InterceptorManager<INetsResponseConfig>
}

interface PromiseChain<T> {
  resolve: ResolvedFn<T> | ((config: INetsRequestConfig) => INetsPromise<T>)
  reject?: RejectFn
}

class Nets implements INets {
  defaults: INetsRequestConfig

  interceptors: Interceptor

  constructor(config?: INetsRequestConfig) {
    this.defaults = config || defaults;
    this.interceptors = {
      request: new InterceptorManager<INetsRequestConfig>(),
      response: new InterceptorManager<INetsResponseConfig>()
    }
  }

  request<T = any>(config: INetsRequestConfig): INetsPromise<T> {
    const chain: PromiseChain<any>[] = [{
      resolve: dispatchRequest,
      reject: undefined
    }]

    this.interceptors.request.forEach(interceptor => {
      // 这个为请求的拦截器，先进后调用
      chain.unshift(interceptor as any);
    })

    this.interceptors.response.forEach(interceptor => {
      // 先进先调用
      chain.push(interceptor as any)
    })

    let promise = Promise.resolve(config);

    while (chain.length) {
      const { resolve, reject } = chain.shift()!
      promise = promise.then(resolve, reject)
    }

    return promise as any;
  }

  get<T>(url: string, config?: INetsRequestConfig): INetsPromise<T> {
    return this.requestMethodWithoutData("GET", url, config ?? {})
  }
  delete<T>(url: string, config?: INetsResponseConfig): INetsPromise<T> {
    return this.requestMethodWithoutData("DELETE", url, config ?? {})
  }
  optoins<T>(url: string, config?: INetsResponseConfig): INetsPromise<T> {
    return this.requestMethodWithoutData("OPTIONS", url, config ?? {})
  }
  head<T>(url: string, config?: INetsResponseConfig): INetsPromise<T> {
    return this.requestMethodWithoutData("HEAD", url, config ?? {})
  }

  post<T>(url: string, data?: any, config?: INetsRequestConfig): INetsPromise<T> {
    return this.requestMethodWithData("POST", url, data ?? {}, config ?? {})
  }
  put<T>(url: string, data?: any, config?: INetsResponseConfig): INetsPromise<T> {
    return this.requestMethodWithData("PUT", url, data ?? {}, config ?? {})
  }
  patch<T>(url: string, data?: any, config?: INetsResponseConfig): INetsPromise<T> {
    return this.requestMethodWithData("PATCH", url, data ?? {}, config ?? {})
  }
  // 优先级：default<config<url+method
  private requestMethodWithoutData(method: IMethod, url: string, config: INetsRequestConfig) {
    return this.request(mergeWith<INetsRequestConfig>(this.defaults, config, { url, method }));
  }
  private requestMethodWithData(method: IMethod, url: string, data: any, config: INetsRequestConfig) {
    const mergeConfig = mergeWith<INetsRequestConfig>(this.defaults, config, { url, method });
    mergeConfig.data = data;
    return this.request(mergeConfig);
  }
}

export default Nets