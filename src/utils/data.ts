import { INetsResponseConfig } from "../types";
import { isPlainObject, isString } from "./deduce"

export function transformRequest(data?: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data;
}

export function transformResponse(res: INetsResponseConfig) {
  if (isString(res.data)) {
    try {
      res.data = JSON.parse(res.data)
    } catch (error) { }
  }
  return res;
}