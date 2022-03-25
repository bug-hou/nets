export function extend<T, U>(to: T, from: U): T & U {
  Object.getOwnPropertyNames(from).forEach(key => {
    (to as any)[key] = (from as any)[key] as any
  })
  return to as any;
}