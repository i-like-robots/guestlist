/// <reference types="express" />
import { Request, Response, NextFunction } from 'express'

import { Guard } from './guard'

export default function(this: Guard, request: Request, response: Response, next: NextFunction): void
