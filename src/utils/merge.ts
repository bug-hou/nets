function mergeWith<T>(...objects: T[]): T {
  let result = Object.create(null);

  objects.forEach(object => {
    Object.keys(object).forEach(key => {
      if (typeof (object as any)[key] === "object" && (object as any)[key] !== null) {
        result[key] = mergeWith(result[key] ?? {}, (object as any)[key])
      } else {
        result[key] = (object as any)[key]
      }
    })
  })

  return result
}


export default mergeWith;