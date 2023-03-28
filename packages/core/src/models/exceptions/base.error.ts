export type BaseErrorType = {
	property: string
	detailInfo?: unknown
	code: string
}

export class BaseError extends Error {
	private _list: BaseErrorType[]
	public get list(): BaseErrorType[] {
		return this._list
	}

	constructor(msg: string, errors: BaseErrorType[] = []) {
		super(msg)
		this.name = msg
		this._list = errors
	}

	addError(error: BaseErrorType): BaseErrorType[] {
		this.list.push(error)
		return this.list
	}

	throw() {
		if (this.list.length > 0) throw this
	}
}
