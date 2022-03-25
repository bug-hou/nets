import { IMethod } from "../types";
import { isPlainObject } from "./deduce";
import mergeWith from "./merge";

function normalizeHeaderName(headers: any, normalizeName: string) {
  if (!headers) return
  Object.keys(headers).forEach(name => {
    if (name.toLowerCase() === normalizeName.toLowerCase() && name !== normalizeName) {
      headers[normalizeName] = headers[name];
      delete headers[name];
    }
  })
}

export function processHeaders(headers: any, data: any) {
  if (isPlainObject(data) && data instanceof File) {
    // 对Content-type大小写做规范
    if (headers) {
      normalizeHeaderName(headers, "Content-Type");
      if (!headers['Content-Type']) {
        headers['Content-Type'] = "application/json;charset=utf-8"
      }
    }
  }
  return headers;
}

export function parseHeaders(headers: string) {
  let parsed = Object.create(null);
  if (!headers) {
    return parsed;
  }
  headers.split('\r\n').forEach(line => {
    let [key, value] = line.split(":");
    key = key.trim().toLowerCase();
    if (!key) {
      return;
    }
    if (value) {
      value = value.trim()
    }
    parsed[key] = value;
  })
  return parsed
}

export function flattenHeaders(headers: any, method: IMethod) {
  if (!headers) {
    return;
  }
  mergeWith(headers, headers.common, headers[method]);

  return headers;
}