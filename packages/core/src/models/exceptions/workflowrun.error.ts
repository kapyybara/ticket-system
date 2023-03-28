import { BaseError, BaseErrorType } from './base.error'

export class WorkflowRunError extends BaseError {
	constructor(errors: BaseErrorType[] = []) {
		super('WorkflowRunError', errors)
		Object.setPrototypeOf(this, WorkflowRunError.prototype)
	}
}
