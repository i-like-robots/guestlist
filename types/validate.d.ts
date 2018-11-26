/// <reference types="express" />
import { Request } from 'express'
import { List } from './list'

declare function validate (request: Request, safelist: List, locations?: string[]): Object

export default validate
