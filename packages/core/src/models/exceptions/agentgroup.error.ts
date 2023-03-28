import { BaseError, BaseErrorType } from './base.error'

export class AgentGroupError extends BaseError {
	constructor(errors: BaseErrorType[] = []) {
		super('AgentGroupError', errors)
		Object.setPrototypeOf(this, AgentGroupError.prototype)
	}
}
