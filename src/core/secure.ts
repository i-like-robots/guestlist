import { Guard } from './guard'
import patrol from './patrol'

export class Secure {
  constructor (guard: Guard) {
    if (guard instanceof Guard === false) {
      throw new TypeError('`guard` must be an instance of Guard')
    }

    return patrol.bind(guard)
  }
}

export default (guard: Guard): Secure => new Secure(guard)
