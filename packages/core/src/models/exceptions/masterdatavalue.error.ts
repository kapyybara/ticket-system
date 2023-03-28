import { BaseError, BaseErrorType } from './base.error'

export class MasterDataValueError extends BaseError {
	constructor(errors: BaseErrorType[] = []) {
		super('MasterDataValueError', errors)
		Object.setPrototypeOf(this, MasterDataValueError.prototype)
	}
}
