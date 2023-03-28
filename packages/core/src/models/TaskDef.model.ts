import { v4 as uuidv4 } from 'uuid'
import { TaskOutCome } from './type'
import { FieldDef } from './FieldDef.model'

import { AgentGroup } from './AgentGroup.model'
import { TaskDefError } from './exceptions/taskdef.error'

export type TaskModeType = 'AUTO' | 'MANUAL'

export const TaskMode: Record<TaskModeType, TaskModeType> = {
	AUTO: 'AUTO',
	MANUAL: 'MANUAL',
}

function isContainSpecialChars(s: string) {
	const check = s.match(/[^a-zA-Z0-9\s+_]/)
	return check
}

/**
 * @property {string} id:
 * @property {string} name:
 * @property {string} code:
 * @property {Record<FieldDef['id'], FieldDef>} form:
 * @property {Record<TaskOutCome['id'], TaskOutCome>} outcome:
 * @property {Record<AgentGroup['id'], AgentGroup>} agentGroup
 * @example
 * const newTaskDef = new TaskDef()
 * newTaskDef.setName('Send mail')
 * newTaskDef.setCode('SEND_MAIL')
 * const newFieldDef = new FieldDef()
 * newFieldDef.setName("Name")
 * newFieldDef.setCode("NAME")
 * newFieldDef.setType({
 *     type: 'SCALAR',
 *     target: 'string'
 * })
 * const employeeVy = {
 * 		email: 'andeatran@gmail.com',
 * 		name: 'Tran Diep Phuong Vy'
 * },
 * const employeeTien = {
 * 		email: 'beo1692@gmail.com',
 * 		name: 'Pham Nhat Tien'
 * },
 * const newAgentGroup = AgentGroup().builder()
 * newAgentGroup.addMember(employeeVy)
 * newAgentGroup.addMember(employeeTien)
 * newAgentGroup.setLeader(employeeTien)
 * newTaskDef.createField(newFieldDef)
 * newTaskDef.setAgentGroup(newAgentGroup)
 */

export class TaskDef {
	private _id: string
	public get id() {
		return this._id
	}
	private _code: string
	public get code() {
		return this._code
	}
	private _name: string
	public get name() {
		return this._name
	}
	private _form: Record<FieldDef['id'], FieldDef> = {}
	public get form() {
		return Object.values(this._form)
	}
	private _outcome: Record<TaskOutCome['id'], TaskOutCome>
	public get outcome() {
		return Object.values(this._outcome)
	}
	private _agentGroup: Record<AgentGroup['id'], AgentGroup>
	public get agentGroup(): AgentGroup {
		return Object.values(this._agentGroup)[0]
	}

	constructor() {
		this._name = ''
		this._code = ''
		this._outcome = {}
		this._form = {}
		this._agentGroup = {}
	}

	// TODO: set method for Code, Name,FieldType, attributesTaskDefinition, Outcome
	public setId(id: string): TaskDef {
		this._id = id
		return this
	}

	/**
	 * @description
	 * + Đặt tên cho định danh công việc
	 * + Tên sẽ được Trim dấu cách
	 * @throws Nếu tên công việc có ký tự đặc biệt -  TaskDefError { property: 'name', code: 'SPECIALCHARS' }
	 * @param name: tên định danh công việc
	 */
	public setName(name: string): string {
		if (isContainSpecialChars(name)) {
			const e = new TaskDefError()
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

	public get getName() {
		return this._name
	}

	/**
	 * @description
	 * + Set code viết hoa toàn bộ định danh công việc
	 * + Code được xóa khoảng trắng trước sau.
	 * + Code được thay thế các khoảng trắng bằng dấu gạch dưới
	 * @throws Nếu code truyền vào có giá trị đặc biệt - TaskDefError { property: 'code', code: 'SPECIALCHARS' }
	 * @param code: code định danh công việc
	 */
	public setCode(code: string): string {
		if (isContainSpecialChars(code)) {
			const e = new TaskDefError()
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

	/**
	 * @description Thêm một field cho TaskDef.form
	 * @throws Nếu field truyền vào đã tồn tại trong danh sách - TaskDefError { property: 'field', code: 'ISEXIST', detail: params.field }
	 * @throws Nếu field truyền vào có code đã tồn tại trong danh sách field - TaskDefError { property: 'field', code: 'CODE_ISEXIST', detail: params.field.code }
	 * @param FieldDef - FieldDef muốn thêm vào danh sách
	 */
	public createField(field: FieldDef): FieldDef {
		this.form.map(i => {
			if (i.id === field.id) {
				const e = new TaskDefError()
				e.addError({
					property: 'field',
					code: 'ISEXIST',
					detailInfo: field,
				})
				e.throw()
			}
			if (i.code === field.code) {
				const e = new TaskDefError()
				e.addError({
					property: 'field',
					code: 'CODE_ISEXIST',
					detailInfo: field.id,
				})
				e.throw()
			}
		})
		const newFieldId = uuidv4()
		field.setId(newFieldId)
		this._form[newFieldId] = field
		return field
	}

	/**
	 * @desciprtion Lấy field theo id
	 * @throws Nếu field không tồn tại - TaskDefError { property: 'field', code: 'NOTFOUND', detail: params.fieldId }
	 * @param fieldId - id của field muốn lấy ra
	 */
	public getField(fieldId: FieldDef['id']): FieldDef {
		const field = this._form[fieldId]
		if (!field) {
			const e = new TaskDefError()
			e.addError({
				property: 'field',
				code: 'NOTFOUND',
				detailInfo: fieldId,
			})
			e.throw()
		}
		return field
	}

	/**
	 * @description
	 * + Xóa field ra khỏi TaskDef
	 * @throws Nếu id truyền vào không tồn tại trong danh sách field - TaskDefError { property: 'field', code: 'NOTFOUND', detail: params.fieldId }
	 * @param fieldId - id của field muốn xóa
	 */
	public deleteField(fieldId: FieldDef['id']): void {
		if (!this._form[fieldId]) {
			const e = new TaskDefError()
			e.addError({
				property: 'field',
				code: 'NOTFOUND',
				detailInfo: fieldId,
			})
			e.throw()
		}
		delete this._form[fieldId]
	}

	/**
	 * @description
	 * + Chỉnh sửa field của MasterData
	 * @throws Nếu id truyền vào không tồn tại trong danh sách field - TaskDefError { property: 'field', code: 'NOTFOUND', detail: params.fieldId }
	 * @throws Nếu field truyền vào có code đã tồn tại trong danh sách field - TaskDefError { property: 'field', code: 'CODE_ISEXIST', detail: params.field.code }
	 * @param fieldId - id của field muốn chỉnh sửa
	 * @param field - field muốn chỉnh sửa
	 *
	 */
	public updateField(fieldId: FieldDef['id'], field: Partial<FieldDef>): FieldDef {
		let oldField = this.getField(fieldId)
		this.form.map(i => {
			if (i.code === field.code && i.id !== fieldId) {
				const e = new TaskDefError()
				e.addError({
					property: 'field',
					code: 'CODE_ISEXIST',
					detailInfo: fieldId,
				})
				e.throw()
			}
		})
		field.code && this._form[fieldId].setCode(field.code)
		field.name && this._form[fieldId].setName(field.name)
		field.type && this._form[fieldId].setType(field.type)

		return this._form[fieldId]
	}

	/**
	 * @description
	 * + Create 1 outcome vào TaskDef
	 * @throws Nếu SubOutCome rỗng - TaskDefError { property: 'outcome', code: 'NOTFOUND', detail: params.outcome.subOutCome }
	 * @throws Nếu outCome giống nhau có cùng SubOutCome - TaskDefError { property: 'outcome', code: 'NOTFOUND', detail: params.outcome.subOutCome }
	 * @param outcome  - outcome muốn thêm vào TaskDef
	 */
	public createOutCome(outcome: TaskOutCome): TaskOutCome {
		this.validateOutCome(outcome)

		const outComeId = uuidv4()
		outcome.id = outComeId

		this._outcome[outComeId] = outcome
		return outcome
	}

	/**
	 * @description
	 * + Lấy task outcome theo id
	 * @throws Nếu TaskOutCome không tồn tại - TaskDefError { property: 'outcome', code: 'NOTFOUND', detail: params.outcomeId }
	 * @param outcomeId
	 */
	public getOutCome(outcomeId: TaskOutCome['id']): TaskOutCome {
		const taskOutCome = this._outcome[outcomeId as string]
		if (!taskOutCome) {
			const e = new TaskDefError()
			e.addError({
				property: 'outcome',
				code: 'NOTFOUND',
				detailInfo: outcomeId,
			})
			e.throw()
		}
		return taskOutCome
	}

	/**
	 * @description
	 * + Thay đổi outcome
	 * @throws Nếu suboutcome rỗng - TaskDefError { property: 'outcome', code: 'NOTFOUND', detail: params.outcomeId }
	 * @throws Nếu outCome giống nhau có cùng SubOutCome - TaskDefError { property: 'outcome', code: 'NOTFOUND', detail: params.outcome.subOutCome }
	 * @param  outcomeId - id của outcome muốn chỉnh sửa
	 * @param  newOutcome - outcome muốn chỉnh sửa
	 */
	public updateOutCome(
		outcomeId: TaskOutCome['id'],
		newOutcome: TaskOutCome,
	): TaskOutCome {
		let oldOutcome = this.getOutCome(outcomeId)
		this.validateOutCome(newOutcome)
		oldOutcome = newOutcome

		return oldOutcome
	}

	/**
	 * @description
	 * + Xóa outcome trong danh sách outcome đưa theo id được truyền vào
	 * @throws Nếu outcome không tồn tại - TaskDefError { property: 'outcome', code: 'NOTFOUND', detail: params.outcomeId }
	 * @param outcome
	 */
	public deleteOutCome(outcomeId: TaskOutCome['id']): void {
		this.getOutCome(outcomeId)
		delete this._outcome[outcomeId as string]
	}
	/**
	 * @description
	 * + Set AgentGroup Cho TaskDef
	 * @throws nếu AgenGroup - TaskDefError { property: 'agentGroup', code: 'NOTFOUND', detail: params.agentgroup }
	 * @param group - agentGroup được thêm vào TaskDef
	 */
	setAgentGroup(group: AgentGroup): AgentGroup {
		if (this._agentGroup[group.id]) {
			const e = new TaskDefError()
			e.addError({
				property: 'agentgroup',
				code: 'NOTFOUND',
				detailInfo: group,
			})
			e.throw()
		}
		this._agentGroup[group.id] = group
		return group
	}
	/**
	 * @description
	 * + get AgentGroup
	 * @throws nếu AgenGroup không tồn tại - TaskDefError { property: 'agentGroup', code: 'NOTFOUND', detail: params.groupId }
	 * @param groupId - id của agentGroup
	 */
	getAgentGroup(groupId: AgentGroup['id']): AgentGroup {
		if (!this._agentGroup[groupId]) {
			const e = new TaskDefError()
			e.addError({
				property: 'agentgroup',
				code: 'NOTFOUND',
				detailInfo: groupId,
			})
			e.throw()
		}
		const groupAgent = this._agentGroup[groupId]
		return groupAgent
	}

	private validateOutCome(outcome: TaskOutCome): void {
		if (!outcome.subOutCome) {
			const e = new TaskDefError()
			e.addError({
				property: 'outcome',
				code: 'NOTFOUND',
				detailInfo: outcome.subOutCome,
			})
			e.throw()
		}

		if (this.isHasOutCome(outcome)) {
			const e = new TaskDefError()
			e.addError({
				property: 'outcome',
				code: 'ISEXIST',
				detailInfo: outcome,
			})
			e.throw()
		}
	}

	public isHasOutCome(outCome: TaskOutCome): boolean {
		return Object.values(this._outcome).reduce((cur, val) => {
			return (
				cur ||
				(val.outcome === outCome.outcome &&
					val.subOutCome === outCome.subOutCome &&
					val.id != outCome.id)
			)
		}, false)
	}

	static builder(): TaskDef {
		return new this()
	}
	/**
	 * @description - validate instance trước khi sử dụng
	 * @throws Nếu name chưa có giá trị - { property: 'name', code: 'ISEMPTY' }
	 * @throws Nếu code chưa có giá trị - { property: 'code', code: 'ISEMPTY' }
	 * @throws Nếu form chưa có giá trị - { property: 'form', code: 'ISEMPTY' }
	 * @throws Nếu outcome chưa có giá trị - { property: 'outcome', code: 'ISEMPTY' }
	 * @throws Nếu agentGroup chưa có giá trị - { property: 'agentGroup', code: 'ISEMPTY' }
	 * @returns trả về giá trị đã được validate
	 */
	build(): TaskDef {
		const e = new TaskDefError()
		if (!this.code) {
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
		if (
			!this._outcome ||
			Object.keys(this._outcome).length === 0 ||
			this._outcome === null
		) {
			e.addError({
				property: 'outcome',
				code: 'ISEMPTY',
			})
		}
		if (
			!this._agentGroup ||
			Object.keys(this._agentGroup).length === 0 ||
			this._agentGroup === null
		) {
			e.addError({
				property: 'agentGroup',
				code: 'ISEMPTY',
			})
		}
		e.throw()
		return this
	}
}
