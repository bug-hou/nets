import { RejectFn, ResolvedFn } from "../types"

interface Interceptor<T> {
  resolve: ResolvedFn<T>
  reject?: RejectFn
}
export default class InterceptorManager<T> {
  private interceptors: (Interceptor<T> | null)[]
  
  constructor() {
    this.interceptors = [];
  }

  use(resolve: ResolvedFn<T>, reject?: RejectFn) {
    this.interceptors.push({
      resolve,
      reject
    })
    return this.interceptors.length - 1;
  }

  forEach(fn: (Interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }

  eject(id: number) {
    if (this.interceptors[id]) {
      this.interceptors[id] = null;
    }
  }
}