import { TaskRunError } from './exceptions/taskrun.error'
import { FieldDef, FieldValue } from './'
import { Employee } from './AgentGroup.model'
import { Task } from './WorkflowDef.model'

export type TaskStatusType =
	| 'PENDING'
	| 'OPEN'
	| 'INPROCESS'
	| 'FAIL'
	| 'DONE'
	| 'CLOSED'

export class TaskRun {
	private _id: string
	public get id(): string {
		return this._id
	}
	private _task: Task
	public get task(): Task {
		return this._task
	}
	private _form: Record<FieldDef['code'], FieldValue>
	public get form(): FieldValue[] {
		return Object.values(this._form)
	}
	private _status: TaskStatusType
	public get status(): TaskStatusType {
		return this._status
	}
	private _assignee: Employee
	public get assignee(): Employee {
		return this._assignee
	}
	constructor() {
		this._task = null
		this._form = {}
		this._status = 'PENDING'
		this._assignee = null
	}

	setId(id: string) {
		this._id = id
		return this._id
	}
	/**
	 * @description
	 * + Gán Task cho MasterDataValue
	 * + Gen ra formValue với giá trị rỗng tương ướng với FieldDef
	 * @param mdd
	 * @returns
	 */
	createFormValue(task: Task): FieldValue[] {
		this._task = task
		this._form = task.taskDef.form.reduce((p, c) => {
			const fiedlValue = new FieldValue()
			fiedlValue.setFieldDef(c)
			return Object.assign({}, p, { [c.code]: fiedlValue })
		}, {})
		return this.form
	}

	/**
	 * @description Trả về giá trị của field của code truyền vào
	 * @throws Nếu field của code không tồn tại - TaskRunError {property: 'form', code: 'NOTFOUND', detailInfo: param.code}
	 * @param code
	 * @returns
	 */
	getFormValue(code: FieldDef['code']): FieldValue {
		const value = this._form[code]
		if (!value) {
			const e = new TaskRunError()
			e.addError({ property: 'form', code: 'NOTFOUND', detailInfo: code })
			e.throw()
		}
		return value
	}

	/**
	 * @description
	 * Gán status cho Task
	 * @param status
	 * @returns
	 */
	setStatus(status: TaskStatusType): TaskStatusType {
		this._status = status
		return
	}

	/**
	 * @description Gán người được phân công cho task
	 * @throws nếu người được phân công không nằm trong agent member - TaskRunError {property: 'assignee', code: 'INVALID', detailInfo: param.emp}
	 * @param emp - người được giao việc
	 * @returns
	 */
	setAssignee(emp: Employee): Employee {
		if (!this._task.taskDef.agentGroup.members.includes(emp)) {
			const e = new TaskRunError()
			e.addError({ property: 'assignee', code: 'INVALID', detailInfo: emp })
			e.throw()
		}
		this._assignee = emp
		return emp
	}

	/**
	 * @description Trả về true nếu employee truyền vào là leader
	 * @param emp
	 * @returns
	 */
	canAssign(emp: Employee): boolean {
		if (this.task.taskDef.agentGroup.leader === emp) {
			return true
		}
		return false
	}

	/**
	 * Trả về true nếu employee truyền vào là leader & assignee
	 * @param emp
	 * @returns
	 */
	canChangeStatus(emp: Employee): boolean {
		if (
			this.task.taskDef.agentGroup.leader === emp ||
			this.task.taskDef.agentGroup.members.find(item => item.email == emp.email)
		) {
			return true
		}
		return false
	}

	/**
	 * Trả về true nếu employee truyền vào là leader & assignee
	 * @param emp
	 * @returns
	 */
	canFillForm(emp: Employee): boolean {
		if (
			this.task.taskDef.agentGroup.leader === emp ||
			this.task.taskDef.agentGroup.members.find(item => item.email == emp.email)
		) {
			return true
		}
		return false
	}

	static builder(): TaskRun {
		return new this()
	}
	/**
	 * @throws nếu không có task - TaskRunError {property: 'task', code: 'ISEMPTY' }
	 * @throws nếu không có assignee - TaskRunError {property: 'assignee', code: 'ISEMPTY' }
	 */
	build() {
		const e = new TaskRunError()
		if (!this.task) {
			e.addError({ property: 'task', code: 'INVALID' })
		}
		if (!this.assignee) {
			e.addError({ property: 'assignee', code: 'INVALID' })
		}
		e.throw()
	}
}
