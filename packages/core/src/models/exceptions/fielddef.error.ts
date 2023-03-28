import { BaseError, BaseErrorType } from './base.error'

export class FieldDefError extends BaseError {
	constructor(errors: BaseErrorType[] = []) {
		super('FieldDefError', errors)
		Object.setPrototypeOf(this, FieldDefError.prototype)
	}
}
