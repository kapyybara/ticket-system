import { BaseError, BaseErrorType } from './base.error'

export class TaskRunError extends BaseError {
	constructor(errors: BaseErrorType[] = []) {
		super('TaskRunError', errors)
		Object.setPrototypeOf(this, TaskRunError.prototype)
	}
}
