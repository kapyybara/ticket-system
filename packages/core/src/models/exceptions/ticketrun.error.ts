import { BaseError, BaseErrorType } from './base.error'

export class TicketRunError extends BaseError {
	constructor(errors: BaseErrorType[] = []) {
		super('TicketRunError', errors)
		Object.setPrototypeOf(this, TicketRunError.prototype)
	}
}
