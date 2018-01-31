import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'

const input = 'src/index.ts'

const plugins = [ typescript() ]

const external = [ 'validator' ]

export default [
  {
    input,
    plugins,
    external,
    output: {
      file: pkg.module,
      format: 'es'
    }
  },
  {
    input,
    plugins,
    external,
    output: {
      file: pkg.main,
      format: 'cjs'
    }
  }
]
