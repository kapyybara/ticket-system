import { BaseError } from '@ithan/core/src/models/exceptions'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { Request, Response, Handler } from 'express'

export const makeHandler = (fn: any): Handler => {
	return async (req: Request, res: Response) => {
		try {
			await fn(req, res)
		} catch (err) {
			res.status(400).json({ ...err })
		}
	}
}
