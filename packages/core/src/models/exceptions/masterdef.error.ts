import { BaseError, BaseErrorType } from './base.error'

export class MasterDataDefError extends BaseError {
    constructor(errors: BaseErrorType[] = []) {
        super('MasterDataDefError', errors)
        Object.setPrototypeOf(this, MasterDataDefError.prototype)
    }
}
