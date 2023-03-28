import { BaseError, BaseErrorType } from './base.error'

export class TicketDefError extends BaseError {
	constructor(errors: BaseErrorType[] = []) {
		super('TicketDefError', errors)
		Object.setPrototypeOf(this, TicketDefError.prototype)
	}
}
