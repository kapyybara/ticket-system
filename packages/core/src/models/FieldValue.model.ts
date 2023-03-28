import { FieldValueError } from './exceptions/fieldvalue.error'
import { FieldDef } from './FieldDef.model'
import { MasterDataDef } from './MasterDataDef.model'
import { MasterDataValue } from './MasterDataValue.model'

export class FieldValue {
	private _id: string
	private _fieldDef: FieldDef
	private _value: unknown

	constructor() {
		this._fieldDef = null
		this._value = null
	}
	public get id() {
		return this._id
	}
	setId(id: string): string {
		this._id = id
		return this.id
	}
	/**
	 * @description
	 * + Thêm fieldDef vào FieldValue
	 * @param fieldDef
	 */
	public setFieldDef(fieldDef: FieldDef): FieldDef {
		this._fieldDef = fieldDef
		return fieldDef
	}
	public get fieldDef() {
		return this._fieldDef
	}

	/**
	 * @description
	 * + set Value cho Field có type là string
	 * + set Value cho Field có type là number
	 * + set Value cho Field có type là date
	 * + set Value cho Field có type là datetime
	 * @throws nếu value = null || undefined - FieldValueError { property: 'value', code: 'INVALID', detail: params.value }
	 * ### Trường hợp type = 'SCALAR'
	 * @throws nếu không đúng type date hoặc datetime - FieldValueError { property: 'value', code: 'NOT_DATETIME', detail: params.value }
	 * @throws nếu value không đúng type string - FieldValueError { property: 'value', code: 'NOT_STRING', detail: params.value }
	 * @throws nếu không đúng type number - FieldValueError { property: 'value', code: 'NOT_NUMBER', detail: params.value }
	 * ### Trường hợp type = 'MASTER_DATA'
	 * @throws nếu không dúng với MasterDataDef - FieldValueError { property: 'value', code: 'NOT_MASTERDATA', detail: params.value }
	 * @param value - value được nhập dựa vào fieldDef
	 */
	public setValue<T>(value: T): T {
		if (!value && value !== 0) {
			const e = new FieldValueError()
			e.addError({
				property: 'value',
				code: 'INVALID',
				detailInfo: value,
			})
			e.throw()
		}
		const typeOfValue = typeof value
		const typeOfField = this._fieldDef.type.target
		if (this._fieldDef.type.type === 'SCALAR') {
			if (
				['date', 'datetime'].includes(typeOfField as string) &&
				!isDate(value)
			) {
				const e = new FieldValueError()
				e.addError({
					property: 'value',
					code: 'NOT_DATETIME',
					detailInfo: value,
				})
				e.throw()
			}
			if (typeOfField === 'string' && typeOfValue !== 'string') {
				const e = new FieldValueError()
				e.addError({
					property: 'value',
					code: 'NOT_STRING',
					detailInfo: value,
				})
				e.throw()
			}
			if (typeOfField === 'number' && typeOfValue !== 'number') {
				const e = new FieldValueError()
				e.addError({
					property: 'value',
					code: 'NOT_NUMBER',
					detailInfo: value,
				})
				e.throw()
			}
		} else {
			if (!(value instanceof MasterDataValue)) {
				const e = new FieldValueError()
				e.addError({
					property: 'value',
					code: 'NOT_MASTERDATA',
					detailInfo: value,
				})
				e.throw()
			}

			if (
				//@ts-ignore
				JSON.stringify(value.getMasterDataDef()) !== JSON.stringify(typeOfField)
			) {
				const e = new FieldValueError()
				e.addError({
					property: 'value',
					code: 'NOT_MASTERDATA',
					detailInfo: value,
				})
				e.throw()
			}
		}
		this._value = value
		return value
	}

	public get value(): unknown {
		return this._value
	}

	static builder(): FieldValue {
		return new this()
	}

	/**
	 * @description
	 * @throws nếu trường FieldDef chưa có gía trị - FieldValue { property: "FieldDef", code: "ISEMPTY" }
	 * @throws nếu trường value chưa có gía trị - FieldValue { property: "value", code: "ISEMPTY" }
	 */
	public build(): FieldValue {
		if (!this._fieldDef) {
			const e = new FieldValueError()
			e.addError({
				property: 'fieldDef',
				code: 'ISEMPTY',
			})
			e.throw()
		} else if (!this._value) {
			const e = new FieldValueError()
			e.addError({
				property: 'value',
				code: 'ISEMPTY',
			})
			e.throw()
		}
		return this
	}
}

function isDate(value: unknown): value is Date {
	return (
		value instanceof Date ||
		(typeof value === 'object' &&
			Object.prototype.toString.call(value) === '[object Date]')
	)
}
