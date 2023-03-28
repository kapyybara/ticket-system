import { AgentGroupError } from './exceptions/agentgroup.error'
function isContainSpecialChars(s: string) {
	const check = s.match(/[^a-zA-Z0-9\s+_]/)
	return check
}
export class Employee {
	email: string
	name: string
}
export class AgentGroup {
	private _id: string
	private _name: string
	private _code: string
	private _leader: Employee | null
	private _members: Employee[]

	constructor() {
		this._name = null
		this._code = null
		this._leader = null
		this._members = []
	}

	public setId(id: string): string {
		this._id = id
		return this._id
	}
	public get id() {
		return this._id
	}
	/**
	 * @description
	 * + Đặt tên cho AgentGroup
	 * + Tên sẽ được trim dấu cách
	 * @throws Nếu tên chứa ký tự đặc biệt -  AgentGroupError { property: 'name', code: 'SPECIALCHARS' }
	 * @param name
	 */
	public setName(name: string): string {
		if (isContainSpecialChars(name)) {
			const e = new AgentGroupError()
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
	 * + Set code cho AgentGroup
	 * + Code sẽ được xóa khoảng trắng trước sau
	 * + Code được viết hoa toàn bộ
	 * + Code được thay thế các khoảng trắng bằng dấu gạch dưới
	 * @throws Nếu code truyền vào có giá trị đặc biệt - AgentGroupError { property: 'code', code: 'SPECIALCHARS' }
	 * @param code
	 */
	public setCode(code: string): string {
		if (isContainSpecialChars(code)) {
			const e = new AgentGroupError()
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
		return code
	}
	public get code() {
		return this._code
	}

	public get members() {
		return this._members
	}
	/**
	 * @description Thêm thành viên vào AgentGroup
	 * @throws Nếu nhân viên đã tồn tại - AgentGroupError { property: members, code: "ISEXIST", detailInfo: params.employee }
	 * @param employee
	 */
	addMember(employee: Employee): Employee {
		if (this._members.find(i => i.email == employee.email)) {
			const e = new AgentGroupError()
			e.addError({
				property: 'members',
				code: 'ISEXIST',
				detailInfo: employee,
			})
			e.throw()
		}
		this._members.push(employee)
		return employee
	}
	/**
	 * @description Lấy thành viên của emai truyền vào từ danh sách
	 * @throws Nếu thành viên không tồn tại - AgentGroupError { property: 'members', code: 'NOTFOUND', detailInfo: params.email }
	 * @param email - email của nhân viên muốn lấy
	 */
	public getMember(email: Employee['email']): Employee {
		const employee = this._members.find(i => i.email === email)
		if (!employee) {
			const e = new AgentGroupError()
			e.addError({ property: 'members', code: 'NOTFOUND', detailInfo: email })
			e.throw()
		}
		return employee
	}
	/**
	 * @description Xóa nhân viên trong Agentgroup
	 * @throws Nếu nhân viên là leader - AgentGroupError { property: 'members', code: 'ISLEADER'}
	 * @throws Nếu member không tồn tại trong danh sách - AgentGroupError { property: 'members', code: 'ISEXEST', detialInfo: params.email}
	 * @param email - email của nhân viên muốn xóa khỏi danh sách
	 */
	deleteMember(email: Employee['email']): void {
		if (this._leader && this._leader.email === email) {
			const e = new AgentGroupError()
			e.addError({ property: 'members', code: 'ISLEADER' })
			e.throw()
		}
		if (!this._members.find(i => i.email === email)) {
			const e = new AgentGroupError()
			e.addError({ property: 'members', code: 'NOTFOUND', detailInfo: email })
			e.throw()
		}
		this._members = this._members.filter(i => i.email !== email)
	}

	public get leader() {
		return this._leader
	}
	/**
	 * @description Gán Leader
	 * @throws Nếu Leader chưa có trong member thì báo lỗi - AgentGroup { property: 'leader', code: 'NOT_A_MEMBER', detailInfo: params.employee }
	 * @throws Nếu leader cũ được gán lại - AgentGroup { property: 'leader', code: 'ALREADY_LEADER', detailInfo: params.employee }
	 * @param employee - Nhân viên được gán làm leader
	 */
	setLeader(employee: Employee): void {
		if (!this._members.find(i => i.email === employee.email)) {
			const e = new AgentGroupError()
			e.addError({
				property: 'leader',
				code: 'NOT_A_MEMBER',
				detailInfo: employee,
			})
			e.throw()
		}
		if (this._leader && this._leader.email === employee.email) {
			const e = new AgentGroupError()
			e.addError({
				property: 'leader',
				code: 'ALREADY_LEADER',
				detailInfo: employee,
			})
			e.throw()
		}

		this._leader = employee
	}

	static builder(): AgentGroup {
		return new this()
	}

	/**
	 * @throws Nếu trường name không có giá trị - AgentGroupError { property: 'name', code: 'ISEMPTY' }
	 * @throws Nếu trường code không có giá trị - AgentGroupError { property: 'code', code: 'ISEMPTY' }
	 * @throws Nếu trường leader không có giá trị - AgentGroupError { property: 'leader', code: 'ISEMPTY' }, AgentGroupError { property: 'member', code: 'ISEMPTY' }
	 * @throws Nếu trường members không có giá trị - AgentGroupError { property: 'member', code: 'ISEMPTY' }
	 */
	public build(): AgentGroup {
		const e = new AgentGroupError()
		if (!this._name) {
			e.addError({
				property: 'name',
				code: 'ISEMPTY',
			})
		}
		if (!this._code) {
			e.addError({
				property: 'code',
				code: 'ISEMPTY',
			})
		}
		if (this._members.length === 0) {
			e.addError({
				property: 'members',
				code: 'ISEMPTY',
			})
			e.addError({
				property: 'leader',
				code: 'ISEMPTY',
			})
		} else if (!this._leader) {
			e.addError({
				property: 'leader',
				code: 'ISEMPTY',
			})
		}

		e.throw()
		return this
	}
}
