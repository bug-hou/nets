import { NetsTransform } from "../types";
import { isArray } from "../utils/deduce";

export function transform(data: any, headers: any, fns?: NetsTransform | NetsTransform[]) {
  if (!fns) {
    return data;
  }
  if (!isArray(fns)) {
    fns = [fns];
  }
  fns.forEach(fn => {
    data = fn(data, headers);
  })
  return data;
}