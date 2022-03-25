export type IMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE" | "HEAD" | "OPTIONS"

export interface INetsRequestConfig {
  baseURL?: string
  method?: IMethod
  data?: any
  params?: any
  url?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  transformRequest?: NetsTransform[] | NetsTransform
  transformResponse?: NetsTransform[] | NetsTransform
  cancelToken?: CancelToken
  withCredentials?: boolean
  xsrfCookieName?: string
  xsrfHeaderName?: string
  auth?: string

  validateStatus?: (n: number) => boolean
  paramsSerializer?: (params: any) => string
  onDownloadProgress?: (e: ProgressEvent) => void
  onUploadProgress?: (e: ProgressEvent) => void

  [key: string]: any
};

export interface INetsResponseConfig<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: INetsRequestConfig
  request: any
}

export interface INetsPromise<T> extends Promise<INetsResponseConfig<T>> {

}

export interface INetsError extends Error {
  isNetsError: boolean
  config: INetsRequestConfig,
  code?: string | null
  request?: any
  response?: INetsResponseConfig
}

export interface INets {
  defaults: INetsRequestConfig

  interceptors: {
    request: NetsInterceptorMangger<INetsRequestConfig>
    response: NetsInterceptorMangger<INetsResponseConfig>
  }

  request<T = any>(config: INetsRequestConfig): INetsPromise<T>

  get<T = any>(url: string, config?: INetsRequestConfig): INetsPromise<T>
  delete<T = any>(url: string, config?: INetsRequestConfig): INetsPromise<T>
  optoins<T = any>(url: string, config?: INetsRequestConfig): INetsPromise<T>
  head<T = any>(url: string, config?: INetsRequestConfig): INetsPromise<T>

  post<T = any>(url: string, data?: any, config?: INetsRequestConfig): INetsPromise<T>
  put<T = any>(url: string, data?: any, config?: INetsRequestConfig): INetsPromise<T>
  patch<T = any>(url: string, data?: any, config?: INetsRequestConfig): INetsPromise<T>
}

export interface NetsInterceptorMangger<T> {
  use(resolve: ResolvedFn<T>, reject?: RejectFn): number

  eject(id: number): void
}

export interface ResolvedFn<T> {
  (value: T): T | Promise<T>
}

export interface RejectFn {
  (error: any): any
}

export interface NetsTransform {
  (data: any, headers?: any): any
}

export interface NetsInstance extends INets {
  create(config?: INetsRequestConfig): INetsRequestConfig

  CancelToken: CancelTokenStatic
  Cancel: CancelStatic
  isCancel: (value: any) => boolean

  all<T>(promise: T[] | Promise<T>[]): Promise<T>[]
  
  spread<T, R>(callback: (...args: T[]) => R): (arr: T[]) => R
}

export interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  throwIfRequested(): void
}

export interface Canceler {
  (message?: string): void
}

export interface CancelExecutor {
  (cancel: Canceler): void
}

export interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}

export interface CancelTokenStatic {
  new(executor: CancelExecutor): CancelToken
  source(): CancelTokenSource
}

export interface Cancel {
  message?: string
}

export interface CancelStatic {
  new(message?: string): Cancel
}