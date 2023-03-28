import { BaseError, BaseErrorType } from './base.error'

export class TaskDefError extends BaseError {
	constructor(errors: BaseErrorType[] = []) {
		super('TaskDefError', errors)
		Object.setPrototypeOf(this, TaskDefError.prototype)
	}
}
