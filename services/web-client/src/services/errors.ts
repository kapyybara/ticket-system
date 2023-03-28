type ErrorType = "TECHNICAL" | "LOGICAL"

export class ServiceError extends Error {
    type!: ErrorType
    msg!: string

    constructor(type: ErrorType, msg: string) {
        super(msg)
        this.type = type
    }
}