import { FieldDef } from './FieldDef.model'
import { FieldValue } from './FieldValue.model'
import { MasterDataDef } from './MasterDataDef.model'
import { MasterDataValueError } from './exceptions/masterdatavalue.error'

/**
 * @example
 * //! string
 * const stringFieldDef = FieldDef.builder()
 * stringFieldDef.setName('User name')
 * stringFieldDef.setType({
 * 	type: 'SCALAR',
 * 	target: 'string',
 * })
 * //! number
 * const numberFieldDef = FieldDef.builder()
 * numberFieldDef.setName('Age')
 * numberFieldDef.setType({
 * 	type: 'SCALAR',
 * 	target: 'number',
 * })
 * const userMs = MasterDataDef.builder()
 *
 * userMs.setName('User data')
 * userMs.createField(stringFieldDef)
 * userMs.createField(numberFieldDef)
 *
 * const stringValue = FieldValue.builder()
 * stringValue.setFieldDef(stringFieldDef)
 * const numberValue = FieldValue.builder()
 * numberValue.setFieldDef(numberFieldDef)
 *
 * const masterDataValue = MasterDataValue.builder()
 * masterDataValue.createFormValue(userMs)
 * masterDataValue.build()
 *
 * @property {MasterDataDef} masterDataDef
 * @property {FieldValue[]} formValue
 */
export class MasterDataValue {
	private _masterDataDef: MasterDataDef
	public get masterDataDef() {
		return this._masterDataDef
	}
	private _formValue: Record<FieldDef['code'], FieldValue>
	public get formValue(): FieldValue[] {
		return Object.values(this._formValue)
	}
	constructor() {
		this._formValue = {}
		this._masterDataDef = null
	}

	/**
	 * @description
	 * + Gán MasterDateDef cho MasterDataValue
	 * + Gen ra formValue với giá trị rỗng tương ướng với MasterDataDef
	 * @param mdd - MasterDataDef truy
	 * @returns
	 */
	createFormValue(mdd: MasterDataDef): MasterDataDef {
		this._masterDataDef = mdd
		this._formValue = mdd.form.reduce((p, c: FieldDef) => {
			const newFieldValue = FieldValue.builder()
			newFieldValue.setFieldDef(c)
			return Object.assign({}, p, { [c.code]: newFieldValue })
		}, {})
		return mdd
	}
	/**
	 * @description Trả về giá trị của Field của code truyền vào
	 * @throws nếu field không tồn tại
	 * @param FieldCode
	 * @returns
	 */
	getValue(code: FieldDef['code']): FieldValue {
		if (!this._formValue[code]) {
			const e = new MasterDataValueError()
			e.addError({
				property: 'formValue',
				code: 'NOTFOUND',
				detailInfo: code,
			})
			e.throw()
		}
		return this._formValue[code]
	}
	/**
	 * @description Trả về tất cả giá trị của Field
	 * @returns
	 */
	getAllValue(): FieldValue[] {
		return Object.values(this._formValue)
	}
	static builder(): MasterDataValue {
		return new this()
	}
	/**
	 * @throws Nếu trường MasterDataDef chưa có gía trị
	 * @throws Nếu trường formValue chưa có gía trị
	 */
	build(): MasterDataValue {
		const e = new MasterDataValueError()
		if (!this._masterDataDef) {
			e.addError({
				property: 'masterDataDef',
				code: 'ISEMPTY',
			})
		}
		if (Object.values(this._formValue).reduce((p, c) => !c.value || p, false)) {
			e.addError({
				property: 'formValue',
				code: 'ISEMPTY',
			})
		}
		e.throw()
		this._masterDataDef.build()
		return this
	}
}
