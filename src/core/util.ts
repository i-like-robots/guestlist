// If the value is an array when it shouldn't be, take the last result
export const single = (value): string => Array.isArray(value) ? value.slice(-1).pop() : value

// If the property is not an array when it should be, array-ify it
export const multiple = (value): Array<string> => [].concat(value)

// much faster but much less safe Object.assign()
export const extend = <T>(target: T, ...items: Object[]): T => {
  const len = items.length

  for (let i = 0; i < len; i++) {
    const item = items[i]

    if (item) {
      for (const prop in item) {
        target[prop] = item[prop]
      }
    }
  }

  return target
}
