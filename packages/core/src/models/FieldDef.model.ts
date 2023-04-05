import { FieldDefError } from './exceptions/fielddef.error'
import { FieldType } from './type'

function isContainSpecialChars(s: string) {
	const check = s.match(/[^a-zA-Z0-9\s+_]/)
	return check
}

/**
 * @property {string} id
 * @property {string} name
 * @property {string} code
 * @property {FieldType} type
 * @example
 * const newFieldDef = FieldDef.builder()
 * newFieldDef.setId('1001')
 * newFieldDef.setName('Name')
 * newFieldDef.setCode('NAME')
 * newFieldDef.setType({
 * 	type: 'SCALAR',
 * 	target: 'string',
 * })
 *
 * console.log(newFieldDef.name) // Name
 * console.log(newFieldDef.code) // NAME
 * console.log(newFieldDef.type) // { type: 'SCALAR', target: 'string' }
 
 */
export class FieldDef {
	private _id!: string
	private _code!: string
	private _name!: string
	private _type!: FieldType

	constructor() {
		this._code = ''
		this._name = ''
		this._type = { type: 'SCALAR', target: 'string' }
	}

	public get id(): string {
		return this._id
	}
	public setId(id: string): FieldDef {
		this._id = id
		return this
	}

	/**
	 * @description
	 * + Đặt tên cho FieldDef
	 * + Tên sẽ được trim dấu cách
	 * @throws Nếu tên chứa ký tự đặc biệt - FieldDefError { property: 'name', code: 'SPECIALCHARS' }
	 * @param name
	 */
	public setName(name: string): string {
		if (isContainSpecialChars(name)) {
			const e = new FieldDefError()
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

	public get name() {
		return this._name
	}

	/**
	 * @description
	 * + Gán code cho fieldDef
	 * + Code sẽ được xóa khoảng trắng trước sau
	 * + Code được viết hoa toàn bộ
	 * + Code được thay thế các khoảng trắng bằng dấu gạch dưới
	 * @throws Nếu code truyền vào có giá trị đặc biệt - FieldDefError { property: 'code', code: 'SPECIALCHARS' }
	 * @param code
	 */
	public setCode(code: string): string {
		if (isContainSpecialChars(code)) {
			const e = new FieldDefError()
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
	public get code(): string {
		return this._code
	}
	/**
	 * @description Gán kiểu dữ liệu cho FieldDef
	 * @param type
	 */
	public setType(type: FieldType): void {
		this._type = type
	}
	public get type() {
		return this._type
	}
	static builder(): FieldDef {
		return new this()
	}
	/**
	 * @description - validate instance trước khi sử dụng
	 * @throws Nếu name chưa có giá trị - { property: 'name', code: 'ISEMPTY' }
	 * @throws Nếu code chưa có giá trị - { property: 'code', code: 'ISEMPTY' }
	 * @throws Nếu type chưa có giá trị - { property: 'type', code: 'ISEMPTY' }
	 * @returns trả về giá trị đã được validate
	 */
	build(): FieldDef {
		const e = new FieldDefError()
		if (!this._code) {
			e.addError({
				property: 'code',
				code: 'ISEMPTY',
			})
		}
		if (!this._name) {
			e.addError({
				property: 'name',
				code: 'ISEMPTY',
			})
		}
		if (!this._type) {
			e.addError({
				property: 'type',
				code: 'ISEMPTY',
			})
		}
		e.throw()
		return this
	}
}
