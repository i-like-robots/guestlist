import pkg from './package.json'

const input = 'src/index.js'

const external = ['validator']

export default [
  {
    input,
    external,
    output: {
      file: pkg.module,
      format: 'es'
    }
  },
  {
    input,
    external,
    output: {
      file: pkg.main,
      format: 'cjs'
    }
  }
]
