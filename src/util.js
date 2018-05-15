export function single(value) {
  return Array.isArray(value) ? value.slice(-1).pop() : value
}

export function multiple(value) {
  return [].concat(value)
}

export function notEmpty(value) {
  return value != null
}

export function extend(target, ...items) {
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

export function get(branch, ...branches) {
  for (const leaf of branches) {
    if (branch.hasOwnProperty(leaf)) {
      branch = branch[leaf]
    } else {
      branch = undefined
      break
    }
  }

  return branch
}
