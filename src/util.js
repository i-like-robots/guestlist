export function single(value) {
  return Array.isArray(value) ? value[value.length - 1] : value
}

export function array(value) {
  return [].concat(value)
}

export function isDefined(value) {
  return value != null
}

export function find(object, property, locations) {
  for (const location of locations) {
    if (isDefined(object[location]) && isDefined(object[location][property])) {
      return object[location][property]
    }
  }
}
