import { BaseError } from '@ithan/core/src/models/exceptions'
import { useMemo } from 'preact/hooks'
import { signal } from '@preact/signals'
type Class<T> = new (...args: any[]) => T
export class InputVM<T extends BaseError> {
	private _set
	private _prop
	private _value
	private _errors
	private _errorClass: T
	constructor(prop: string, set: (value: string) => string, errorClass: T) {
		this._prop = prop
		this._set = set
		this._errors = signal<T | null>(null)
		this._value = signal('')
		this._errorClass = errorClass
	}
	public get value() {
		return this._value
	}
	public get errors() {
		return this._errors
	}
	public setValue = (value: string) => {
		try {
			this._value.value = value
			this._set(value)
			this._errors.value = null
		} catch (e) {
			//@ts-ignore
			if (e instanceof this._errorClass) {
				this.errors.value = e as T
			}
		}
	}
}

export const useInputVM = <T>(prop: string, set: any, errorClass: any) => {
	return useMemo(() => new InputVM(prop, set, errorClass), [])
}
