import { WorkflowDefError } from './exceptions/workflowdef.error'
import { TaskDef } from './TaskDef.model'
import { FieldDef } from './FieldDef.model'
import { TaskOutCome } from './type'
import { v4 as uuid } from 'uuid'

function isContainSpecialChars(s: string) {
	const check = s.match(/[^a-zA-Z0-9\s+_]/)
	return check
}

export type Task = {
	id: string
	name: string
	code: string
	taskDef: TaskDef
}

export type TaskRelationship = {
	id?: string
	source: Task
	outCome: TaskOutCome
	target: Task
}

export type InputMappingType = {
	task: Task
	field: FieldDef
}

export type InputMapping = {
	id?: string
	source: InputMappingType
	target: InputMappingType
}

export class WorkflowDef {
	private _tasks: Record<Task['id'], Task>
	public get tasks(): Task[] {
		return Object.values(this._tasks)
	}
	private _relationships: Record<TaskRelationship['id'], TaskRelationship>
	public get relationships() {
		return Object.values(this._relationships)
	}
	private _inputMapping: Record<InputMapping['id'], InputMapping>
	public get inputMapping() {
		return Object.values(this._inputMapping)
	}

	constructor() {
		this._tasks = {}
		this._relationships = {}
		this._inputMapping = {}
	}

	/**
	 * @description Tạo task mới dựa theo taskDef truyền vào và thêm vào danh sách tasks
	 * @param taskDef - TaskDef truyền vào để tạo task mới
	 * @returns
	 */
	createTask(taskDef: TaskDef): Task {
		const newTaskId = uuid() as string
		const newTask: Task = {
			id: newTaskId,
			name: taskDef.name,
			code: taskDef.code + newTaskId.substring(0, 4),
			taskDef: taskDef,
		}
		this._tasks[newTaskId] = newTask
		return newTask
	}

	/**
	 * @description Lấy task của id truyền vào
	 * @throws Nếu task không tồn tại - WorkflowDefError { property: 'tasks', code: 'NOTFOUND', detailInfo: param.taskId }
	 * @param taskId
	 */
	getTask(taskId: Task['id']): Task {
		const task = this._tasks[taskId]
		if (!task) {
			const e = new WorkflowDefError()
			e.addError({ property: 'tasks', code: 'NOTFOUND', detailInfo: taskId })
			e.throw()
		}
		return task
	}

	/**
	 * @description
	 * + Chỉnh sửa Task
	 * + Chỉ cho sửa tên và code
	 * @throws Nếu task không tồn tại - WorkflowDefError { property: 'tasks', code: 'NOTFOUND', detailInfo: param.taskId }
	 * @throws Nếu code mới đã tồn tại - WorkflowDefError { property: 'tasks', code: 'ISEXIST', detailInfo: param.taskId }
	 * @param taskId - id của task muốn chỉnh sửa
	 * @param task - thông tin của task chỉnh sữa bao gồm name và code
	 */
	updateTask(taskId: Task['id'], newTask: Task): Task {
		const oldTask = this.getTask(taskId)
		if (oldTask.taskDef !== newTask.taskDef) {
			const e = new WorkflowDefError()
			e.addError({
				property: 'tasks',
				code: 'ISEXIST',
				detailInfo: taskId,
			})
			e.throw()
		}
		if (oldTask.id !== newTask.id) {
			const e = new WorkflowDefError()
			e.addError({
				property: 'tasks',
				code: 'NOTFOUND',
				detailInfo: taskId,
			})
			e.throw()
		}
		oldTask.name = newTask.name
		return oldTask
	}

	/**
	 * @description
	 * + Xóa task của id truyền vào
	 * + Xóa tất cả quan hệ có liên quan trực tiếp
	 * @throws Nếu task không tồn tại - WorkflowDefError { property: 'tasks', code: 'NOTFOUND', detailInfo: param.taskId }
	 * @param taskId - id của task muốn xóa
	 */
	deleteTask(taskId: Task['id']): void {
		this.getTask(taskId)
		const relationshipToDelete = this.collectDirectRelationship(taskId)
		relationshipToDelete.map(relationship =>
			this.deleteRelationship(relationship.id),
		)
		delete this._tasks[taskId]
	}

	/**
	 * @description Tạo Relationship giữa 2 task
	 * @throws Nếu relationship đã tồn tại - WorkflowDefError { property: 'relationships', code: 'ISEXIST', detailInfo: param.relationship }
	 * @throws Nếu source task không tồn tại trong danh sách task - WorkflowDefError { property: 'relationships', code: 'SOURCE_NOTFOUND', detailInfo: param.relationship.source }
	 * @throws Nếu outcome không tồn tại trong source task - WorkflowDefError { property: 'relationships', code: 'OUTCOME_NOTFOUND', detailInfo: param.relationship.outcome }
	 * @throws Nếu target task không tồn tại trong danh sách task - WorkflowDefError { property: 'relationships', code: 'TARGET_NOTFOUND', detailInfo: param.relationship.target }
	 * @param relationship
	 */
	createRelationship(relationship: TaskRelationship): TaskRelationship {
		this.validateRelationship(relationship)
		// if (this.isRelationshipExist(relationship)) {
		// 	//FIXME
		// }
		relationship.id = uuid()
		this._relationships[relationship.id] = relationship

		return relationship
	}

	/**
	 * @description Lấy relationship của id từ danh sách
	 * @throws Nếu relationship của id truyền vào không tồn tại - WorkflowDefError { property: 'relationships', code: 'ISEXIST', detailInfo: param.relationshipId }
	 * @param relationshipId
	 */
	getRelationship(relationshipId: TaskRelationship['id']): TaskRelationship {
		const relationship = this._relationships[relationshipId]
		if (!relationship) {
			const e = new WorkflowDefError()
			e.addError({
				property: 'relationships',
				code: 'NOTFOUND',
				detailInfo: relationshipId,
			})
			e.throw()
		}
		return relationship
	}

	/**
	 * @description Chỉnh sửa Relationship
	 * @throws Nếu relationship của id truyền vào không tồn tại - WorkflowDefError { property: 'relationships', code: 'ISEXIST', detailInfo: param.relationshipId }
	 * @throws Nếu outcome không tồn tại trong source task - WorkflowDefError { property: 'relationships', code: 'OUTCOME_NOTFOUND', detailInfo: param.relationship.outcome }
	 * @param relationshipId
	 * @param TaskRelationship
	 */
	updateRelationship(
		relationshipId: TaskRelationship['id'],
		newRelationship: TaskRelationship,
	): TaskRelationship {
		const relationship = this._relationships[relationshipId]
		if (!relationship) {
			const e = new WorkflowDefError()
			e.addError({
				property: 'relationships',
				code: 'NOTFOUND',
				detailInfo: relationshipId,
			})
			e.throw()
		}
		this.validateRelationship(newRelationship)
		this._relationships[relationshipId].outCome = newRelationship.outCome
		this._relationships[relationshipId].source = newRelationship.source
		this._relationships[relationshipId].target = newRelationship.target

		return this._relationships[relationshipId as string]
	}

	/**
	 * @description Xóa relationship của id truyền vào
	 * @throws Nếu relationship của id truyền vào không tồn tại - WorkflowDefError { property: 'relationships', code: 'ISEXIST', detailInfo: param.relationshipId }
	 * @param relationshipId
	 */
	deleteRelationship(relationshipId: TaskRelationship['id']): void {
		this.getRelationship(relationshipId)
		delete this._relationships[relationshipId]
	}

	private isInputMappingExist(inputMapping: InputMapping): boolean {
		return this.inputMapping.reduce<boolean>((p, c) => {
			return (
				(c.source.task.id === inputMapping.source.task.id &&
					c.target.task.id === inputMapping.target.task.id &&
					c.source.field.id === inputMapping.source.field.id &&
					c.target.field.id === inputMapping.target.field.id) ||
				p
			)
		}, false)
	}

	private validateInputMapping(inputMapping: InputMapping) {
		const { source, target } = inputMapping
		const sourcesAvailable = this.findSourcesAvailable(target.task)
		if (
			!(
				target.field.type.type === source.field.type.type &&
				JSON.stringify(target.field.type.target) ===
					JSON.stringify(source.field.type.target)
			)
		) {
			const e = new WorkflowDefError()
			e.addError({
				property: 'inputMapping',
				code: 'INVALID',
				detailInfo: inputMapping,
			})
			e.throw()
		}
		if (!sourcesAvailable.includes(source.task.id)) {
			const e = new WorkflowDefError()
			e.addError({
				property: 'inputMapping',
				code: 'INVALID',
				detailInfo: inputMapping,
			})
			e.throw()
		}
		if (!source.task.taskDef.form.find(i => i.id === source.field.id)) {
			const e = new WorkflowDefError()
			e.addError({
				property: 'inputMapping',
				code: 'SOURCE_FIELD_NOTFOUND',
				detailInfo: inputMapping,
			})
			e.throw()
		}
		if (!target.task.taskDef.form.find(i => i.id === target.field.id)) {
			const e = new WorkflowDefError()
			e.addError({
				property: 'inputMapping',
				code: 'TARGET_FIELD_NOTFOUND',
				detailInfo: inputMapping,
			})
			e.throw()
		}
		if (this.isInputMappingExist(inputMapping)) {
			const e = new WorkflowDefError()
			e.addError({
				property: 'inputMapping',
				code: 'TARGET_FIELD_ISEXIST',
				detailInfo: inputMapping,
			})
			e.throw()
		}
	}

	/**
	 * @description Thêm inputMapping vào Workflow
	 * @throws Nếu inputMapping target.field đã tồn tại - WorkflowDefError - { property: 'inputMappings', code: 'TARGET_FIELD_ISEXIST', detailInfo: param.inputMapping.target.field }
	 * @throws Nếu source.field hoặc target.field không tồn tại:
	 * + WorkflowDefError - { property: 'inputMappings', code: 'SOURCE_FIELD_NOTFOUND', detailInfo: param.inputMapping.target.field }
	 * + WorkflowDefError - { property: 'inputMappings', code: 'TARGET_FIELD_NOTFOUND', detailInfo: param.inputMapping.target.field }
	 * @throws Nếu InputMapping source.task và target.task không có relationship và target phải nằm sau source - WorkflowDefError - { property: 'inputMappings', code: 'INVALID', detailInfo: param.inputMapping }
	 * @throws Nếu source.field và target.field không cùng type
	 * @param inputMapping
	 */
	createInputMapping(inputMapping: InputMapping): InputMapping {
		this.validateInputMapping(inputMapping)

		const newInputMappingId = uuid()
		inputMapping.id = newInputMappingId
		this._inputMapping[newInputMappingId] = inputMapping

		return inputMapping
	}

	/**
	 * @description Lấy inputMapping của id truyền vào
	 * @throws Nếu inputMapping không tồn tại -  WorkflowDefError { property: 'inputMappings', code: 'NOTFOUND', detailInfo: param.inputMappingId }
	 * @param inputMappingId
	 * @returns
	 */
	getInputMapping(inputMappingId: InputMapping['id']): InputMapping {
		if (!this._inputMapping[inputMappingId]) {
			const e = new WorkflowDefError()
			e.addError({
				property: 'inputMapping',
				code: 'NOTFOUND',
				detailInfo: inputMappingId,
			})
			e.throw()
		}
		const inputMapping = this._inputMapping[inputMappingId]
		return inputMapping
	}

	/**
	 * @description Sửa inputMapping
	 * @throws Nếu inputMapping không tồn tại - workflowdeferror { property:'inputmapping', code: 'notfound', detailinfo: param.inputmappingid }
	 * @throws Nếu source.field hoặc target.field không tồn tại:
	 * + WorkflowDefError - { property: 'inputMappings', code: 'SOURCE_FIELD_NOTFOUND', detailInfo: param.inputMapping.target.field }
	 * + WorkflowDefError - { property: 'inputMappings', code: 'TARGET_FIELD_NOTFOUND', detailInfo: param.inputMapping.target.field }
	 * @throws Nếu InputMapping source và target không có relationship WorkflowDefError :
	 * + { property: 'inputMapping', code: 'SOURCE_INVALID' }
	 * + { property: 'inputMapping', code: 'TATGET_INVALID' }
	 * @throws Nếu source.field và target.field không cùng type - WorkflowDef { property: 'inputMapping': code: 'WRONG_TYPE', detail: { source.type, target.type }}
	 * @param inputMappingId
	 * @param inputMapping
	 * @returns
	 */
	updateInputMapping(
		inputMappingId: InputMapping['id'],
		inputMapping: InputMapping,
	): InputMapping {
		if (!this._inputMapping[inputMappingId]) {
			const e = new WorkflowDefError()
			e.addError({
				property: 'inputMapping',
				code: 'NOTFOUND',
				detailInfo: inputMappingId,
			})
			e.throw()
		}
		if (
			this.inputMapping.find(i => {
				return (
					JSON.stringify(i.source) === JSON.stringify(inputMapping.source) &&
					JSON.stringify(i.target) === JSON.stringify(inputMapping.target)
				)
			})
		) {
			const e = new WorkflowDefError()
			e.addError({
				property: 'inputMapping',
				code: 'ISEXIST',
				detailInfo: inputMapping,
			})
			e.throw()
		}
		this.validateInputMapping(inputMapping)
		this._inputMapping[inputMappingId].source = inputMapping.source
		this._inputMapping[inputMappingId].target = inputMapping.target
		return this._inputMapping[inputMappingId]
	}

	/**
	 * @description Xóa inputMapping
	 * @throws Nếu inputMapping không tồn tại - WorkflowDefError { property: "inputMapping", code: 'NOTFOUND', detailInfo: param.id }
	 * @param id
	 */
	deleteInputMapping(id: InputMapping['id']): void {
		this.getInputMapping(id)
		delete this._inputMapping[id]
	}

	private isRelationshipExist(relationship: TaskRelationship): boolean {
		return Object.values(this.relationships).reduce((cur, val) => {
			return (
				cur ||
				(val.outCome === relationship.outCome &&
					val.source === relationship.source &&
					val.target === relationship.target)
			)
		}, false)
	}

	private validateRelationship(relationship: TaskRelationship): void {
		if (!this.tasks.find(i => i.id === relationship.source.id)) {
			const e = new WorkflowDefError()
			e.addError({
				property: 'relationships',
				code: 'SOURCE_NOTFOUND',
				detailInfo: relationship,
			})
			e.throw()
		}
		if (!this.tasks.find(i => i.id === relationship.target.id)) {
			const e = new WorkflowDefError()
			e.addError({
				property: 'relationships',
				code: 'TARGET_NOTFOUND',
				detailInfo: relationship,
			})
			e.throw()
		}
		if (
			this.relationships.find(
				i =>
					i.outCome.id === relationship.outCome.id &&
					i.source.id === relationship.source.id &&
					i.target.id === relationship.target.id,
			)
		) {
			const e = new WorkflowDefError()
			e.addError({
				property: 'relationships',
				code: 'ISEXIST',
			})
			e.throw()
		}
		relationship.source.taskDef.getOutCome(relationship.outCome.id)
	}

	/**
	 * @description Tìm tất cả các task có quan hệ phía trước nó
	 * @throws nếu task không tồn tại workflowDefError { property: 'tasks', code: "NOTFOUND", detailInfo: param.target.id }
	 * @param target
	 * @returns
	 */
	public findSourcesAvailable(target: Task): Task['id'][] {
		const nodes = Object.keys(this._tasks)
		const edges = Object.values(this.relationships).map(i => {
			return [i.target.id, i.source.id]
		})

		const formatedEdges = {}
		nodes.map(i => {
			formatedEdges[i] = []
				.concat(formatedEdges[i])
				.concat(
					edges.reduce((p, c) => {
						if (c[0] === i) {
							return p.concat([c[1]])
						}
						return p
					}, []),
				)
				.filter(i => i)
		})

		const visted = []

		function DFS(egdes, node, visted) {
			if (visted.includes(node)) return
			visted.push(node)
			egdes[node] &&
				egdes[node].map(i => {
					DFS(egdes, i, visted)
				})
		}
		DFS(formatedEdges, target.id, visted)

		return visted
	}

	private collectDirectRelationship(taskId: Task['id']): TaskRelationship[] {
		return Object.values(this.relationships).filter(
			relationship =>
				relationship.source.id === taskId || relationship.target.id === taskId,
		)
	}
	static builder(): WorkflowDef {
		return new this()
	}
	private validateInputMappingBuild(inputMapping: InputMapping): boolean {
		const { target, source } = inputMapping
		return !!this.findSourcesAvailable(target.task).find(
			i => i === source.task.id,
		)
	}

	/**
	 * @throws Nếu workflow không chứa task nào WorkflowDefError { property: 'tasks', code: 'NOTFOUND' }
	 * @throws Nếu có inputmapping có source và target không hợp lệ  WorkflowDefError { property: 'inputMapping', code: 'INVALID' }
	 * @returns
	 */
	public build(): WorkflowDef {
		const e = new WorkflowDefError()
		if (this.tasks.length === 0) {
			e.addError({
				property: 'tasks',
				code: 'ISEMPTY',
			})
		}
		if (this.relationships.length === 0) {
			e.addError({
				property: 'relationships',
				code: 'ISEMPTY',
			})
		}
		if (this.inputMapping.length === 0) {
			e.addError({
				property: 'inputMapping',
				code: 'ISEMPTY',
			})
		}
		!this.inputMapping.map(inputMapping => {
			const { source, target } = inputMapping
			const sourcesAvailable = this.findSourcesAvailable(target.task)
			if (!(source.task && sourcesAvailable.includes(source.task.id))) {
				e.addError({
					property: 'inputMapping',
					code: 'CANT_CONNECT',
					detailInfo: inputMapping,
				})
			}
		})

		e.throw()
		return this
	}
}
