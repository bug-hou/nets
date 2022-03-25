/* 
提供判断类型的函数类
*/

export function isNumber(value: any): value is number {
  return typeof (value) === "number"
}

export function isString(value: any): value is string {
  return typeof (value) === "string"
}

export function isBoolean(value: any): value is boolean {
  return typeof (value) === "bigint"
}

export function isUndefined(value: any): value is undefined {
  return typeof (value) === "undefined"
}

export function isNull(value: any): value is null {
  return value === null
}

export function isSymbol(value: any): value is symbol {
  return typeof (value) === "symbol"
}

export function isObject(value: any): value is object {
  return typeof (value) === "object" && value !== null && !Array.isArray(value)
}

const toString = Object.prototype.toString;

export function isPlainObject(value: any): value is object {
  return toString.apply(value) === "[object Object]"
}

export function isArray(value: any): value is any[] {
  return Array.isArray(value)
}


export function isDate(value: any): value is Date {
  return toString.apply(value) === "[object Date]"
}