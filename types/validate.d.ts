/// <reference types="express" />
import { Request } from 'express'
import { Guard } from './guard'

declare function validate (request: Request, safelist: Guard, locations?: string[]): AnyObject

export default validate
