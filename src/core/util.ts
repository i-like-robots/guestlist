// If the value is an array when it shouldn't be, take the last result
export const single = (value): string => Array.isArray(value) ? value.slice(-1).pop() : value

// If the parameter is not an array when it should be, array-ify it
export const multiple = (value): Array<string> => [].concat(value)
