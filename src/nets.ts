import Nets from "./core/nets";
import { INetsRequestConfig, NetsInstance } from "./types";
import { extend } from "./utils/extend";
import mergeWith from "./utils/merge";
import CancelToken from "./cancel/cancelToken";
import Cancel, { isCancel } from "./cancel/cancel"

function createInstance(config?: INetsRequestConfig): NetsInstance {
  const nets = new Nets();
  const instance = Nets.prototype.request.bind(nets);
  extend(instance, nets);
  extend(instance, Object.getPrototypeOf(nets));
  return instance as unknown as NetsInstance;
}
const nets = createInstance();

nets.create = function (config) {
  return createInstance(mergeWith(nets.defaults, config))
}

nets.CancelToken = CancelToken
nets.Cancel = Cancel
nets.isCancel = isCancel

nets.all = function <T>(promises: Promise<T>[] | T[]) {
  return Promise.all(promises) as any
}

nets.spread = function (callback) {
  return function (arr) {
    return callback.apply(null, arr)
  }
}

export default nets