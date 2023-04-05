import { Request, Response, Handler } from 'express'

type ErrorType = 'TECHNICAL' | 'LOGICAL'

export class ServiceError extends Error {
	type!: ErrorType
	error!: string

	constructor(type: ErrorType, error: any) {
		super('ServiceError')
		this.type = type
		this.error = error
	}
}

export const makeHandler = (fn: any): Handler => {
	return async (req: Request, res: Response) => {
		try {
			await fn(req, res)
		} catch (err) {
			console.log(err)
			res.status(400).json({ ...err })
		}
	}
}
