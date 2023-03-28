import { FieldDef } from './FieldDef.model'
import { WorkflowDef } from './WorkflowDef.model'

import { v4 as uuid } from 'uuid'
import { TicketDefError } from './exceptions/ticketdef.error'

function isContainSpecialChars(s: string) {
	const check = s.match(/[^a-zA-Z0-9\s+_]/)
	return check
}

/**
 * @property {string} name:
 * @property {string} code:
 * @property {Record<FieldDef['id'], FieldDef>} form:
 * @property {WorkflowDef} workflow:
 * @example
 * const newTicketDef = TicketDef()
 * newTicketDef.setName('recruitment')
 * newTicketDef.setCode('RECRUITMENT')
 * const newFieldDef = new FieldDef()
 * newFieldDef.setName("age")
 * newFieldDef.setCode("AGE")
 * newFieldDef.setType({
 *     type: 'SCALAR',
 *     target: 'string'
 * })
 * newTicketDef.createField(newFieldDef)
 *
 * const newWorkflowDef = WorkflowDef()
 * const TaskOne = workflowDef.createTask(TaskDefSendMail)
 * const TaskTwo = workflowDef.createTask(TaskDefInterview)
 * const TaskThree = workflowDef.createTask(TaskDefPO)
 * newWorkflowDef.createRelationship({
 * 	source: TaskOne,
 *		outCome: TaskOne.outcome[0]),
 *		target: TaskTwo,
 * 	})
 *  newWorkflowDef.createRelationship({
 * 	source: TaskTwo,
 *		outCome: TaskOne.outcome[0]),
 *		target: TaskThree,
 * 	})
 *  newWorkflowDef.createInputMapping({
 * 	source: {
 * 	 	task:TaskOne,
 * 		field:TaskOne.taskDef.form[0]
 *  	}
 * 	target: {
 * 	 	task:TaskThree,
 * 		field:TaskThree.taskDef.form[0]
 *  	}
 * })
 * newTicketDef.workflow(newWorkflowDef)
 *
 */
export class TicketDef {
	private _name: string
	public get name() {
		return this._name
	}
	private _code: string
	public get code() {
		return this._code
	}
	private _workflow: WorkflowDef
	public get workflow() {
		return this._workflow
	}
	private _form: Record<FieldDef['id'], FieldDef>
	public get form() {
		return Object.values(this._form)
	}
	constructor() {
		this._name = ''
		this._code = ''
		this._form = {}
	}

	private findField(id: FieldDef['id']): FieldDef | undefined {
		return Object.values(this._form).find(i => i.id === id)
	}
	/**
	 * @description
	 * + Đặt tên cho ticket
	 * + Tên sẽ được Trim dấu cách
	 * @throws Nếu tên công việc có ký tự đặc biệt -  TicketDefError { property: 'name', code: 'SPECIALCHARS' }
	 * @param name: tên định danh ticket
	 */
	public setName(name: string): string {
		if (isContainSpecialChars(name)) {
			const e = new TicketDefError()
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
	 * + Set code viết hoa toàn bộ định danh ticket
	 * + Code được xóa khoảng trắng trước sau.
	 * + Code được thay thế các khoảng trắng bằng dấu gạch dưới
	 * @throws Nếu code truyền vào có giá trị đặc biệt - TicketDefError { property: 'code', code: 'SPECIALCHARS' }
	 * @param code: code định danh ticket
	 */
	public setCode(code: string): string {
		if (isContainSpecialChars(code)) {
			const e = new TicketDefError()
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
	 * @description
	 * + Thêm workflowDef
	 * @throws Nếu workflowDef đã tồn tại - TicketDefError { property: 'workflow', code: 'ISEXIST', detail: params.workflowdef }
	 * @param workflowdef - Workflowdef được thêm vào TicketDef
	 */
	public createWorkFlowDef(workflowdef: WorkflowDef): WorkflowDef {
		if (this._workflow) {
			const e = new TicketDefError()
			e.addError({
				property: 'workflow',
				code: 'ISEXIST',
				detailInfo: workflowdef,
			})
			e.throw()
		}
		this._workflow = workflowdef
		return this._workflow
	}

	/**
	 * @description Thêm một field cho TicketDef.form
	 * @throws Nếu field truyền vào đã tồn tại trong danh sách - TicketError { property: 'field', code: 'ISEXIST', detail: params.field }
	 * @throws Nếu field truyền vào có code đã tồn tại trong danh sách field - TicketError { property: 'field', code: 'CODE_ISEXIST', detail: params.field.code }
	 * @param FieldDef - FieldDef muốn thêm vào danh sách
	 */
	public createField(field: FieldDef): FieldDef {
		this.form.map(i => {
			if (i.id === field.id) {
				const e = new TicketDefError()
				e.addError({
					property: 'field',
					code: 'ISEXIST',
					detailInfo: field,
				})
				e.throw()
			}
			if (i.code === field.code) {
				const e = new TicketDefError()
				e.addError({
					property: 'field',
					code: 'CODE_ISEXIST',
					detailInfo: field,
				})
				e.throw()
			}
		})
		const newFieldId = uuid()
		field.setId(newFieldId)
		this._form[newFieldId] = field
		return field
	}

	/**
	 * @desciprtion Trả field có id trùng với id được truyền vào
	 * @throws Nếu id truyền vào không tồn tại trong danh sách field - TicketDefError { property: 'field', code: 'NOTFOUND', detail: params.fieldId }
	 * @param fieldId - id của field muốn lấy ra
	 */
	public getField(fieldId: FieldDef['id']): FieldDef {
		const field = this._form[fieldId]
		if (!field) {
			const e = new TicketDefError()
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
	 * + Chỉnh sửa field của MasterData
	 * @throws Nếu id truyền vào không tồn tại trong danh sách field - TicketDefError { property: 'field', code: 'NOTFOUND', detail: params.fieldId }
	 * @throws Nếu field truyền vào có code đã tồn tại trong danh sách field - TicketDefError { property: 'field', code: 'CODE_ISEXIST', detail: params.field.code }
	 * @param fieldId - id của field muốn chỉnh sửa
	 * @param field - field muốn chỉnh sửa
	 *
	 */
	public updateField(fieldId: FieldDef['id'], field: Partial<FieldDef>): FieldDef {
		this.getField(fieldId)
		this.form.map(i => {
			if (i.code === field.code && i.id !== fieldId) {
				const e = new TicketDefError()
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
	 * + Xóa field ra khỏi TaskDef
	 * @throws Nếu id truyền vào không tồn tại trong danh sách field - TicketDefError { property: 'field', code: 'NOTFOUND', detail: params.fieldId }
	 * @param fieldId - id của field muốn xóa
	 */
	public deleteField(fieldId: FieldDef['id']): void {
		if (!this._form[fieldId]) {
			const e = new TicketDefError()
			e.addError({
				property: 'field',
				code: 'NOTFOUND',
				detailInfo: fieldId,
			})
			e.throw()
		}
		delete this._form[fieldId]
	}

	static builder(): TicketDef {
		return new TicketDef()
	}

	/**
	 * Build lại workflowDef
	 * @throws Nếu name chưa có giá trị - { property: 'name', code: 'ISEMPTY' }
	 * @throws Nếu code chưa có giá trị - { property: 'code', code: 'ISEMPTY' }
	 * @throws Nếu form chưa có giá trị - { property: 'form', code: 'ISEMPTY' }
	 */
	public build(): TicketDef {
		// this._workflow.build()
		const e = new TicketDefError()
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
		e.throw()
		return this
	}
}
