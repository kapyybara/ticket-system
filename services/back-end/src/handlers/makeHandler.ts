import { Request, Response, Handler } from "express"

type ErrorType = "TECHNICAL" | "LOGICAL"

// type ExpressHandler = (req: Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => void

export class ServiceError extends Error {
    type!: ErrorType
    msg!: string

    constructor(type: ErrorType, msg: string) {
        super(msg)
        this.type = type
        this.msg = msg
    }
}

export const makeHandler = (fn: any): Handler => {
    return async (req: Request, res: Response) => {
        try {
            await fn(req, res)
        } catch (err) {
            console.log(err)
            res.status(400).json(err)
        }
    }
}