import { BaseError, BaseErrorType } from './base.error'

export class FieldValueError extends BaseError {
	constructor(errors: BaseErrorType[] = []) {
		super('FieldValueError', errors)
		Object.setPrototypeOf(this, FieldValueError.prototype)
	}
}