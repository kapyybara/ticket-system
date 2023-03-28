import { TaskStatusType } from './TaskRun.model'
import { Employee } from '@src/models/AgentGroup.model'
import { FieldDef } from './FieldDef.model'
import { FieldValue } from './FieldValue.model'
import { TicketDef } from './TicketDef.model'
import { WorkflowRun } from './WorkflowRun.model'
import { TicketRunError } from './exceptions'

function isContainSpecialChars(s: string) {
	const check = s.match(/[^a-zA-Z0-9\s+_]/)
	return check
}
export type TicketStatusType = 'OPEN' | 'INPROGRESS' | 'DONE' | 'FAIL'

export class TicketRun {
	private _id: string
	public get id() {
		return this._code
	}
	private _code: string
	public get code() {
		return this._code
	}
	private _name: string
	public get name() {
		return this._name
	}
	private _requester: Employee
	public get requester(): Employee {
		return this._requester
	}
	private _ticketDef: TicketDef
	public get ticketDef() {
		return this._ticketDef
	}
	private _formValue: Record<FieldDef['code'], FieldValue>
	public get formValue(): FieldValue[] {
		return Object.values(this._formValue)
	}
	private _workflowrun: WorkflowRun
	public get workflowrun(): WorkflowRun {
		return this._workflowrun
	}
	private _status: TicketStatusType
	public get status(): TicketStatusType {
		return this._status
	}

	constructor() {
		this._name = ''
		this._code = ''
		this._formValue = {}
		this._status = 'OPEN'
		this._workflowrun = new WorkflowRun()
	}

	/**
	 * @description
	 * + Đặt tên cho ticket
	 * + Tên sẽ được Trim dấu cách
	 * @throws Nếu tên công việc có ký tự đặc biệt -  TicketError { property: 'name', code: 'SPECIALCHARS' }
	 * @param name: tên công việc
	 */
	public setName(name: string): string {
		if (isContainSpecialChars(name)) {
			const e = new TicketRunError()
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
	 * + Set code viết hoa toàn bộ ticket
	 * + Code được xóa khoảng trắng trước sau.
	 * + Code được thay thế các khoảng trắng bằng dấu gạch dưới
	 * @throws Nếu code truyền vào có giá trị đặc biệt - TicketError { property: 'code', code: 'SPECIALCHARS' }
	 * @param code: code ticket
	 */
	public setCode(code: string): string {
		if (isContainSpecialChars(code)) {
			const e = new TicketRunError()
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
	 * @description Gán người raise ticket
	 * @param emp
	 */
	public setRequester(emp: Employee): Employee {
		this._requester = emp
		return emp
	}

	/**
	 * @description Gán status cho ticket:
	 * + OPEN: được gán khi khởi tạo
	 * + INPROGRESS: điều kiện value trong form đã được điền đầy đủ. Sau khi set tất cả các task đầu tiên được gán thành 'OPEN'
	 * + DONE: điều kiện value trong form đã được điền đầy đủ ,tất cả các task cuối cùng phải DONE
	 * @param status
	 */
	public setStatus(status: TicketStatusType): void {
		const e = new TicketRunError()
		this.formValue.map(i => {
			if (!i.value) {
				e.addError({
					property: 'status',
					code: 'FIELDVALUE_NOTREADY',
					detailInfo: i.fieldDef.code,
				})
			}
		})

		if (status === 'DONE') {
			this._workflowrun.workflowDef.relationships
				.reduce(
					(p, c) => {
						return p.filter(i => i.task.id !== c.source.id)
					},
					[...this._workflowrun.taskRun],
				)
				.map((i, _, a) => {
					if (i.status !== 'DONE') {
						e.addError({
							property: 'status',
							code: 'WORKFLOWRUN_NOTREADY',
							detailInfo: i,
						})
					}
				})
		}
		e.throw()

		if (status === 'INPROGRESS') {
			this._workflowrun.workflowDef.relationships
				.reduce(
					(p, c) => {
						return p.filter(i => i.task.id !== c.target.id)
					},
					[...this._workflowrun.taskRun],
				)
				.map((i, _, a) => {
					i.setStatus('OPEN')
				})
		}

		this._status = status
	}

	/**
	 * @description
	 * + Gán TicketDef cho Ticket
	 * + Tạo danh sách FieldValue dựa vào danh sách FieldDef của TicketDef
	 * + Tạo workflowRun dựa theo workflowDef của ticketDef
	 * + @param ticketDef - ticketDef truyền vào Ticket
	 */
	public setTicketDef(ticketDef: TicketDef): void {
		this._ticketDef = ticketDef
		this._workflowrun.setWorkflowDef(this.ticketDef.workflow)
		this._formValue = ticketDef.form.reduce((p, c) => {
			const fiedlValue = new FieldValue()
			fiedlValue.setFieldDef(c)
			return Object.assign({}, p, { [c.code]: fiedlValue })
		}, {})
	}

	/**
	 * @description Trả về giá trị của field của code truyền vào
	 * @throws Nếu field của code không tồn tại - TicketRunError {property: 'form', code: 'NOTFOUND', detailInfo: param.code}
	 * @param code
	 * @returns
	 */
	public getFormValue(code: FieldDef['code']): FieldValue {
		const value = this._formValue[code]
		if (!value) {
			const e = new TicketRunError()
			e.addError({ property: 'form', code: 'NOTFOUND', detailInfo: code })
			e.throw()
		}
		return value
	}

	static builder(): TicketRun {
		return new TicketRun()
	}
	/**
	 * @description
	 * @throws Nếu name chưa có giá trị - { property: 'name', code: 'ISEMPTY' }
	 * @throws Nếu code chưa có giá trị - { property: 'code', code: 'ISEMPTY' }
	 * @throws Nếu form chưa có giá trị - { property: 'form', code: 'ISEMPTY' }
	 */
	public build() {
		const e = new TicketRunError()
		if (!this._name) {
			e.addError({ property: 'name', code: 'ISEMPTY' })
		}
		if (!this._code) {
			e.addError({ property: 'code', code: 'ISEMPTY' })
		}
		if (!this._formValue || Object.keys(this._formValue).length === 0) {
			e.addError({ property: 'form', code: 'ISEMPTY' })
		}
		e.throw()
		return this
	}
}
