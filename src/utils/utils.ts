/**
 * 深拷贝
 */
export const deepCopy = <T>(obj: T): T => {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  let copy: any

  if (Array.isArray(obj)) {
    copy = []
    for (let i = 0; i < obj.length; i++) {
      copy[i] = deepCopy(obj[i])
    }
  } else {
    copy = {}
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        copy[key] = deepCopy(obj[key])
      }
    }
  }

  return copy as T
}

/**
 * 是否为空对象
 */
export const isEmptyObject = (obj: object) => {
  return !Object.keys(obj).length && obj.constructor === Object
}
