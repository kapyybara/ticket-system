import { MasterDataDefError } from './exceptions/masterdef.error'
import { v4 as uuid } from 'uuid'
import { FieldDef } from './FieldDef.model'
import {} from './exceptions/masterdef.error'

function isContainSpecialChars(s: string) {
	const check = s.match(/[^a-zA-Z0-9\s+_]/)
	return check
}

/**
 * @property {string} id:
 * @property {string} name:
 * @property {string} code:
 * @property {FieldDef['code'][]} displayField:
 * @property {Record<FieldDef['id'], FieldDef>} form:
 * @example
 * const newMDD = new MasterDataDef()
 * newMDD.setName('User')
 * newMDD.setCode('USER')
 * const newFieldDef = new FieldDef()
 * newFieldDef.setName("Name")
 * newFieldDef.setCode("NAME")
 * newFieldDef.setType({
 *     type: 'SCALAR',
 *     target: 'string'
 * })
 * newMDD.createField(newFieldDef)
 * newMDD.addDisplayField(newFieldDef.code)
 */
export class MasterDataDef {
	private _id: string
	private _name: string
	private _description: string
	private _code: string
	private _displayField: FieldDef['code'][]
	private _form: Record<FieldDef['id'], FieldDef>
	public get id() {
		return this._id
	}
	public get name() {
		return this._name
	}
	public get code() {
		return this._code
	}
	public get description() {
		return this._description
	}
	public get displayField() {
		return this._displayField
	}
	public get form() {
		return Object.values(this._form)
	}

	constructor() {
		this._name = ''
		this._code = ''
		this._form = {}
		this._displayField = []
	}

	private findField(id: FieldDef['id']): FieldDef | undefined {
		return Object.values(this._form).find(i => i.id === id)
	}

	setId(id: string): MasterDataDef {
		this._id = id
		return this
	}
	/**
	 * @description
	 * + Đặt tên cho MasterDataDef
	 * + Tên sẽ được trim dấu cách
	 * @throws Nếu tên chứa ký tự đặc biệt -  MasterDataDefError { property: 'name', code: 'SPECIALCHARS' }
	 * @param name
	 */
	public setName(name: string): string {
		if (isContainSpecialChars(name)) {
			const e = new MasterDataDefError()
			e.addError({
				property: 'name',
				code: 'SPECIALCHARS',
			})
			e.throw()
		}
		const newName = name.replaceAll(/\s\s+/g, ' ').trim()
		this._name = newName
		return this._name
	}

	/**
	 * @description
	 * + Set code cho MasterDataDef
	 * + Code sẽ được xóa khoảng trắng trước sau
	 * + Code được viết hoa toàn bộ
	 * + Code được thay thế các khoảng trắng bằng dấu gạch dưới
	 * @throws Nếu code truyền vào có giá trị đặc biệt - MasterDataDefError { property: 'code', code: 'SPECIALCHARS' }
	 * @param code
	 */
	public setCode(code: string): string {
		if (isContainSpecialChars(code)) {
			const e = new MasterDataDefError()
			e.addError({
				property: 'code',
				code: 'SPECIALCHARS',
			})
			e.throw()
		}
		this._code = code
			.toUpperCase()
			.trim()
			.replaceAll(/\s\s+/g, ' ')
			.replaceAll(' ', '_')
		return this._code
	}
	public setDescription(value: string): string {
		this._description = value
		return this._description
	}
	/**
	 * @description
	 * + Thêm Field hiển thị cho MasterDataDef
	 * + Field không tồn tại trong form thì báo lỗi
	 * + Field đã tồn tại thì báo lỗi
	 * @throws Nếu field của code truyền vào không tồn tại trong danh sách fields - MasterDataDefError { property: 'field', code: 'NOTFOUND', detail: params.code }
	 * @throws Nếu code truyền vào đã tồn tại trong danh sách displayfield - MasterDataDefError { property: 'displayField', code: 'ISEXIST', detail: params.code }
	 * @param code - code của field muốn được thêm vào danh sách displayField
	 */
	public addDisplayField(code: FieldDef['code']) {
		if (!this.form.find(i => i.code === code)) {
			const e = new MasterDataDefError()
			e.addError({
				property: 'field',
				code: 'NOTFOUND',
				detailInfo: code,
			})
			e.throw()
		}
		if (this.displayField.find(i => i === code)) {
			const e = new MasterDataDefError()
			e.addError({
				property: 'displayField',
				code: 'ISEXIST',
				detailInfo: code,
			})
			e.throw()
		}
		this._displayField = this._displayField.concat([code])
	}

	/**
	 * @description
	 * + Xóa displayField cho MasterDataDef
	 * @throws Nếu id truyền vào không tồn tại trong danh sách displayfield - MasterDataDefError { property: 'displayField', code: 'NOTFOUND', detail: params.code }
	 * @param code - code của field muốn được xóa khỏi danh sách displayField
	 */
	public deleteDisplayField(code: FieldDef['code']): void {
		if (!this._displayField.find(i => i === code)) {
			const e = new MasterDataDefError()
			e.addError({
				property: 'displayField',
				code: 'NOTFOUND',
				detailInfo: code,
			})
			e.throw()
		}
		this._displayField = this.displayField.filter(i => i !== code && i)
	}

	/**
	 * @description Thêm một field cho MasterData.form
	 * @throws Nếu field truyền vào đã tồn tại trong danh sách field - MasterDataDefError { property: 'field', code: 'ISEXIST', detail: params.field }
	 * @throws Nếu field truyền vào có code đã tồn tại trong danh sách field - MasterDataDefError { property: 'field', code: 'CODE_ISEXIST', detail: params.field.code }
	 * @param FieldDef - FieldDef muốn thêm vào danh sách
	 */
	public createField(field: FieldDef): FieldDef {
		this.form.map(i => {
			if (i.id === field.id) {
				const e = new MasterDataDefError()
				e.addError({
					property: 'field',
					code: 'ISEXIST',
					detailInfo: field,
				})
				e.throw()
			}
			if (i.code === field.code) {
				const e = new MasterDataDefError()
				e.addError({
					property: 'field',
					code: 'CODE_ISEXIST',
					detailInfo: field.id,
				})
				e.throw()
			}
		})

		const newId = uuid()
		field.setId(newId)
		this._form[newId] = field
		return field
	}

	/**
	 * @desciprtion Trả field có id trùng với id được truyền vào
	 * @throws Nếu id truyền vào không tồn tại trong danh sách field - MasterDataDefError { property: 'displayField', code: 'NOTFOUND', detail: params.id }
	 * @param id - id của field muốn lẫy ra
	 */
	public getField(id: FieldDef['id']): FieldDef {
		const field = this.form.find(i => i.id === id)
		if (!field) {
			const e = new MasterDataDefError()
			e.addError({
				property: 'field',
				code: 'NOTFOUND',
				detailInfo: id,
			})
			e.throw()
		}
		return field
	}

	/**
	 * @description
	 * + Chỉnh sửa field của MasterData
	 * + DisplayField tương ứng sẽ đưọc cập nhật
	 * @throws Nếu id truyền vào không tồn tại trong danh sách field - MasterDataDefError { property: 'displayField', code: 'NOTFOUND', detail: params.id }
	 * @throws Nếu field truyền vào có code đã tồn tại trong danh sách field - MasterDataDefError { property: 'field', code: 'CODE_ISEXIST', detail: params.field.code }
	 * @param id - id của field muốn chỉnh sửa
	 * @param field - field muốn chỉnh sửa
	 *
	 */
	public updateField(id: FieldDef['id'], field: Partial<FieldDef>): FieldDef {
		const oldFieldCode = this.getField(id).code
		if (field.code) {
			this.form.map(i => {
				if (
					i.code ===
						field.code
							.toUpperCase()
							.trim()
							.replaceAll(/\s\s+/g, ' ')
							.replaceAll(' ', '_') &&
					i.id !== id
				) {
					const e = new MasterDataDefError()
					e.addError({
						property: 'field',
						code: 'CODE_ISEXIST',
						detailInfo: id,
					})
					e.throw()
				}
			})
			this._form[id].setCode(field.code)
		}
		field.name && this._form[id].setName(field.name)
		field.type && this._form[id].setType(field.type)
		this._displayField = this._displayField.map(i => {
			if (oldFieldCode === i) {
				return field.code
			}
			return i
		})
		return this._form[id]
	}
	/**
	 * @description
	 * + Xóa field ra khỏi MasterData
	 * + Xóa field hiển thị tương ứng
	 * @throws Nếu id truyền vào không tồn tại trong danh sách field - MasterDataDefError { property: 'displayField', code: 'NOTFOUND', detail: params.id }
	 * @param id - id của field muốn xóa
	 */
	public deleteField(id: FieldDef['id']): void {
		const field = this.findField(id)
		if (!field) {
			const e = new MasterDataDefError()
			e.addError({
				property: 'field',
				code: 'NOTFOUND',
				detailInfo: id,
			})
			e.throw()
		}
		this._displayField = this.displayField.filter(i => i !== field.code)
		delete this._form[field.id]
	}

	static builder(): MasterDataDef {
		return new this()
	}

	/**
	 * @throws Báo lỗi nếu trường name chưa có gía trị - MasterDataDef { property: "name", code: "ISEMPTY" }
	 * @throws Báo lỗi nếu trường code chưa có gía trị - MasterDataDef { property: "code", code: "ISEMPTY" }
	 * @throws Báo lỗi nếu trường type chưa có gía trị - MasterDataDef { property: "type", code: "ISEMPTY" }
	 * @returns
	 */
	build(): MasterDataDef {
		const e = new MasterDataDefError()
		if (!this._code || this._code === '' || this._code === null) {
			e.addError({
				property: 'code',
				code: 'ISEMPTY',
			})
		}
		if (!this._name || this._name === '' || this._name === null) {
			e.addError({
				property: 'name',
				code: 'ISEMPTY',
			})
		}
		if (
			!this._form ||
			Object.keys(this._form).length === 0 ||
			this._form === null
		) {
			e.addError({
				property: 'form',
				code: 'ISEMPTY',
			})
		}
		e.throw()
		return this
	}
}
