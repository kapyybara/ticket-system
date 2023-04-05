type ErrorType = 'TECHNICAL' | 'LOGICAL'

export class ServiceError extends Error {
	type!: ErrorType
	error!: any

	constructor(type: ErrorType, error: any) {
		super('ServiceError')
		this.type = type
		this.error = error
	}
}
