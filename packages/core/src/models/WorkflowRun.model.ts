import { TaskOutCome } from './type'
import { WorkflowDef } from './WorkflowDef.model'
import { TaskRun } from './TaskRun.model'
import { WorkflowRunError } from './exceptions'
import { v4 as uuid } from 'uuid'

export class WorkflowRun {
	private _workflowDef: WorkflowDef
	public get workflowDef() {
		return this._workflowDef
	}
	private _taskRun: Record<TaskRun['id'], TaskRun>
	public get taskRun() {
		return Object.values(this._taskRun)
	}
	constructor() {
		this._workflowDef = null
		this._taskRun = {}
	}
	/**
	 * @description
	 * + Gán WorkflowDef cho WorkflowRun
	 * + Gen danh sách TaskRun dựa vào danh sách TaskDef của WorkflowDef
	 * @param wfd - workflowdef truyền vào workflowrun
	 * @returns
	 */
	setWorkflowDef(workflowDef: WorkflowDef): TaskRun[] {
		this._workflowDef = workflowDef
		workflowDef.tasks.map(task => {
			const taskRun = TaskRun.builder()
			taskRun.createFormValue(task)
			taskRun.setId(uuid())
			this._taskRun[taskRun.id] = taskRun
		})
		return this.taskRun
	}

	/**
	 * @description
	 * + Lấy TaskRun của id truyền vào
	 * @throws nếu TaskRun của id không tồn tại - WorkflowRun { property: "taskrun", code: "NOTFOUND",, detailInfo: param.id }
	 * @param id - id của taskRun truyền vào
	 */
	getTaskRun(id: TaskRun['id']): TaskRun {
		if (!this._taskRun[id]) {
			const e = new WorkflowRunError()
			e.addError({ property: 'taskrun', code: 'NOTFOUND', detailInfo: id })
			e.throw()
		}
		const taskRun = this._taskRun[id]
		return taskRun
	}

	/**
	 * @description
	 * + Chuyển status taskRun 'CLOSED' và mở 'OPEN' taskRun tiếp theo
	 * + Nếu là task cuối => chỉ chuyển status của taskRun hiện tại => "CLOSED"
	 * + Nếu có relationship khác cùng trỏ vào task target thì check source của relationship đó. Nếu chưa DONE chỉ set CLOSED  Task hiện tại
	 * @throws Nếu outcome và status hiện taị không trung nhau - WorkflowRunError { property : 'taskRun', code: 'INVALID_OUTCOME' }
	 * @param taskRun - taskrun truyền vào workflowrun
	 * @param outCome - outcome Taskrun truyền vào workflowrun
	 * @returns
	 */
	next(taskRun: TaskRun, outCome: TaskOutCome) {
		const source = this.getTaskRun(taskRun.id)
		if (source.status !== outCome.outcome) {
			const e = new WorkflowRunError()
			e.addError({
				property: 'taskRun',
				code: 'INVALID_OUTCOME',
			})
			e.throw()
		}
		this.workflowDef.relationships
			.filter(i => i.source.id === source.task.id)
			.map(relationship => {
				const target = this.taskRun.find(
					i => i.task.id === relationship.target.id,
				)
				if (
					this.workflowDef.relationships
						.filter(
							i =>
								i.target.id === target.task.id &&
								i.source.id !== source.task.id,
						)
						.reduce((p, c) => {
							return (
								p &&
								this.taskRun.find(i => i.task.id === c.source.id).status ===
									'DONE'
							)
						}, true) &&
					relationship.outCome.id === outCome.id
				)
					target.setStatus('OPEN')
			})
		source.setStatus('CLOSED')
	}
	static builder(): WorkflowRun {
		return new WorkflowRun()
	}
	/**
	 * @throws nếu trường taskRun chưa có gía trị - WorkflowRun { property: "taskrun", code: "ISEMPTY" }
	 */
	public build(): WorkflowRun {
		const e = new WorkflowRunError()
		if (!this._workflowDef) {
			e.addError({ property: 'workflowDef', code: 'ISEMPTY' })
		}
		e.throw()
		return this
	}
}
