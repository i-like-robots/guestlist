import { Guard } from './guard'

export declare class Secure {
  constructor(guard: Guard)
}

declare const secure: (guard: Guard) => Secure

export default secure
