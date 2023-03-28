import { BaseError, BaseErrorType } from './base.error'

export class WorkflowDefError extends BaseError {
	constructor(errors: BaseErrorType[] = []) {
		super('WorkflowDefError', errors)
		Object.setPrototypeOf(this, WorkflowDefError.prototype)
	}
}

