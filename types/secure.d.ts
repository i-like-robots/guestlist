/// <reference types="express" />
import { Request, Response, NextFunction } from 'express'
import { Guard } from './guard'

declare function middleware (this: Guard, request: Request, response: Response, next: NextFunction): void

declare const secure: (target: string) => middleware

export default secure
