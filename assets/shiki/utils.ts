export const createSingleton = <T, Params extends Array<any>>(fn: (...arg: Params) => T) => {
  let instance: T | undefined
  return (...args: Params) => {
    if (!instance) {
      instance = fn(...args)
    }
    return instance
  }
}
