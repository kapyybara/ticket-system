import { TaskRelationship } from './../src/models/WorkflowDef.model'
import { TaskOutCome } from '../src/models/type'
import { FieldDef, TaskDef, AgentGroup, WorkflowDef } from '../src/models'
import { WorkflowDefError } from '../src/models/exceptions'

const compareTwoArray = (a: any[], b: any[]) =>
	a.length === b.length && a.every(v => b.includes(v))

const mock = () => {
	const stringField = FieldDef.builder()
	stringField.setCode('NAME')
	stringField.setName('Name')
	stringField.setType({
		target: 'string',
		type: 'SCALAR',
	})
	const numberField = FieldDef.builder()
	numberField.setCode('AGE')
	numberField.setName('age')
	numberField.setType({
		target: 'number',
		type: 'SCALAR',
	})

	const stringField1 = FieldDef.builder()
	stringField1.setCode('NAME')
	stringField1.setName('Name')
	stringField1.setType({
		target: 'string',
		type: 'SCALAR',
	})
	const numberField1 = FieldDef.builder()
	numberField1.setCode('AGE')
	numberField1.setName('age')
	numberField1.setType({
		target: 'number',
		type: 'SCALAR',
	})

	const mockAgent1 = AgentGroup.builder()
	mockAgent1.setName('group A')
	mockAgent1.addMember({
		name: 'Nguyen Van B',
		email: 'NguyenVanB@gmail.com',
	})
	mockAgent1.addMember({
		name: 'Nguyen Van A',
		email: 'NguyenVanA@gmail.com',
	})
	mockAgent1.addMember({
		name: 'Nguyen Van C',
		email: 'NguyenVanC@gmail.com',
	})

	const sendMailTaskDef: TaskDef = TaskDef.builder()
	sendMailTaskDef.setCode('SEND_EMAIL')
		sendMailTaskDef.setName('send mail')
	sendMailTaskDef.setAgentGroup(mockAgent1)
	sendMailTaskDef.createField(stringField)
	sendMailTaskDef.createField(numberField)
	sendMailTaskDef.createOutCome({
		outcome: 'DONE',
		subOutCome: 'Gửi thành công',
	})
	sendMailTaskDef.createOutCome({
		outcome: 'DONE',
		subOutCome: 'Gửi không thành công',
	})

	const sendPackageTaskDef: TaskDef = TaskDef.builder()
	sendPackageTaskDef.setCode('SEND_PACKAGE')
	sendPackageTaskDef.setName('send package')
	sendPackageTaskDef.setAgentGroup(mockAgent1)
	sendPackageTaskDef.createField(stringField1)
	sendPackageTaskDef.createField(numberField1)
	sendPackageTaskDef.createOutCome({
		outcome: 'DONE',
		subOutCome: 'Gửi thành công',
	})
	sendPackageTaskDef.createOutCome({
		outcome: 'DONE',
		subOutCome: 'Gửi không thành công',
	})

	return {
		sendMailTaskDef,
		sendPackageTaskDef,
		stringField,
		numberField,
	}
}

let workflowDef = new WorkflowDef()
let expectError = new WorkflowDefError()
let receivedError = new WorkflowDefError()

beforeEach(() => {
	workflowDef = new WorkflowDef()
	expectError = new WorkflowDefError()
	receivedError = new WorkflowDefError()
})

describe('workflowDef.createTask', () => {
	it('Thêm công việc vào định nghĩa công việc', () => {
		const { sendMailTaskDef } = mock()
		const newTask = workflowDef.createTask(sendMailTaskDef)

		expect(newTask.taskDef).toEqual(sendMailTaskDef)
	})
})

describe('workflowDef.getTask', () => {
	it('Get task theo id tương ứng', () => {
		const { sendMailTaskDef } = mock()
		const workflowDef = new WorkflowDef()
		const newTask = workflowDef.createTask(sendMailTaskDef)
		expect(workflowDef.getTask(newTask.id)).toEqual(newTask)
	})
	it('Báo lỗi nếu task có id tương ứng không tồn tại', () => {
		const { sendMailTaskDef } = mock()
		const workflowDef = new WorkflowDef()
		workflowDef.createTask(sendMailTaskDef)
		expectError.addError({
			property: 'tasks',
			code: 'NOTFOUND',
			detailInfo: 'abc',
		})
		try {
			workflowDef.getTask('abc')
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})

describe('workflowDef.updateTask', () => {
	it('Chỉnh sửa Task có id tương ứng', () => {
		const { sendMailTaskDef } = mock()
		const newTask = workflowDef.createTask(sendMailTaskDef)
		const updatedTask = workflowDef.updateTask(newTask.id, {
			...newTask,
			name: 'oke',
		})
		expect(updatedTask).toEqual({ ...newTask, name: 'oke' })
	})
	it('Báo lỗi nếu task có id tương ứng không tồn tại', () => {
		const { sendMailTaskDef } = mock()
		const workflowDef = new WorkflowDef()
		const newTask = workflowDef.createTask(sendMailTaskDef)
		const updatedTask = { ...newTask, name: 'Gửi Hàng' }
		expectError.addError({
			property: 'tasks',
			code: 'NOTFOUND',
			detailInfo: 'asd',
		})
		try {
			workflowDef.updateTask('asd', updatedTask)
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})

describe('workflowDef.deleteTask', () => {
	it('Xóa Task', () => {
		const { sendMailTaskDef } = mock()
		const newTask = workflowDef.createTask(sendMailTaskDef)
		workflowDef.deleteTask(newTask.id)
		expect(workflowDef.tasks).toEqual([])
	})
	it('Báo lỗi nếu task có id tương ứng không tồn tại', () => {
		const { sendMailTaskDef } = mock()
		const workflowDef = new WorkflowDef()
		workflowDef.createTask(sendMailTaskDef)
		expectError.addError({
			property: 'tasks',
			code: 'NOTFOUND',
			detailInfo: 'NotExistID',
		})
		try {
			workflowDef.deleteTask('NotExistID')
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
	it('Xóa tất cả quan hệ có liên quan trực tiếp', () => {
		const { sendMailTaskDef } = mock()
		const workflowDef = new WorkflowDef()
		const newTaskSendMail = workflowDef.createTask(sendMailTaskDef)
		const newTaskSendPackage = workflowDef.createTask(sendMailTaskDef)
		const newTaskGetPackage = workflowDef.createTask(sendMailTaskDef)
		workflowDef.createRelationship({
			source: newTaskSendPackage,
			outCome: newTaskSendPackage.taskDef.outcome[0],
			target: newTaskSendMail,
		})
		workflowDef.deleteTask(newTaskSendPackage.id)
		expect(workflowDef.relationships).toEqual([])
	})
})

describe('workflowDef.createRelationship', () => {
	it('Tạo mới quan hệ giữa 2 task', () => {
		const { sendMailTaskDef, sendPackageTaskDef } = mock()
		const workflowDef = new WorkflowDef()
		const newTaskSendMail = workflowDef.createTask(sendMailTaskDef)
		const newTaskSendPackage = workflowDef.createTask(sendPackageTaskDef)
		const relationship = workflowDef.createRelationship({
			source: newTaskSendMail,
			outCome: newTaskSendMail.taskDef.outcome[0],
			target: newTaskSendPackage,
		})

		expect(workflowDef.relationships).toEqual([relationship])
	})
	it('Báo lỗi nếu source task không tồn tại trong danh sách task', () => {
		const { sendMailTaskDef, sendPackageTaskDef } = mock()
		const workflowDef = new WorkflowDef()
		const newTaskSendMail = workflowDef.createTask(sendMailTaskDef)
		workflowDef.deleteTask(newTaskSendMail.id)
		const newTaskSendPackage = workflowDef.createTask(sendPackageTaskDef)
		try {
			workflowDef.createRelationship({
				source: newTaskSendMail,
				outCome: newTaskSendPackage.taskDef.outcome[0],
				target: newTaskSendPackage,
			})
		} catch (error) {
			receivedError = error
		}
		expectError.addError({
			property: 'relationships',
			code: 'SOURCE_NOTFOUND',
			detailInfo: {
				source: newTaskSendMail,
				outCome: newTaskSendPackage.taskDef.outcome[0],
				target: newTaskSendPackage,
			},
		})
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
	it('Báo lỗi nếu outcome không tồn tại trong source task', () => {
		const { sendMailTaskDef, sendPackageTaskDef } = mock()
		const workflowDef = new WorkflowDef()
		const newTaskSendMail = workflowDef.createTask(sendMailTaskDef)
		const newTaskSendPackage = workflowDef.createTask(sendPackageTaskDef)
		const fakeOutcome: TaskOutCome = {
			outcome: 'DONE',
			subOutCome: 'fake outcome',
		}
		try {
			workflowDef.createRelationship({
				source: newTaskSendMail,
				outCome: fakeOutcome,
				target: newTaskSendPackage,
			})
		} catch (error) {
			receivedError = error
		}
		expectError.addError({
			property: 'outcome',
			code: 'NOTFOUND',
			detailInfo: fakeOutcome.id,
		})
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
	it('Báo lỗi nếu target task không tồn tại trong danh sách task', () => {
		const { sendMailTaskDef, sendPackageTaskDef } = mock()
		const workflowDef = new WorkflowDef()
		const newTaskSendMail = workflowDef.createTask(sendMailTaskDef)
		const newTaskSendPackage = workflowDef.createTask(sendPackageTaskDef)
		workflowDef.deleteTask(newTaskSendPackage.id)
		try {
			workflowDef.createRelationship({
				source: newTaskSendMail,
				outCome: newTaskSendPackage.taskDef.outcome[0],
				target: newTaskSendPackage,
			})
		} catch (error) {
			receivedError = error
		}
		expectError.addError({
			property: 'relationships',
			code: 'TARGET_NOTFOUND',
			detailInfo: {
				source: newTaskSendMail,
				outCome: newTaskSendPackage.taskDef.outcome[0],
				target: newTaskSendPackage,
			},
		})
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
	it('Báo lỗi nếu relationship đã tồn tại', () => {
		const { sendMailTaskDef, sendPackageTaskDef } = mock()
		const workflowDef = new WorkflowDef()
		const newTaskSendMail = workflowDef.createTask(sendMailTaskDef)
		const newTaskSendPackage = workflowDef.createTask(sendPackageTaskDef)
		workflowDef.createRelationship({
			source: newTaskSendMail,
			outCome: newTaskSendMail.taskDef.outcome[0],
			target: newTaskSendPackage,
		})
		try {
			workflowDef.createRelationship({
				source: newTaskSendMail,
				outCome: newTaskSendMail.taskDef.outcome[0],
				target: newTaskSendPackage,
			})
		} catch (error) {
			receivedError = error
		}
		expectError.addError({
			property: 'relationships',
			code: 'ISEXIST',
		})
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})

describe('workflowDef.updateRelationship', () => {
	it('Chỉnh sửa Relationship có id tương ứng', () => {
		const { sendMailTaskDef, sendPackageTaskDef } = mock()
		const newTaskSendMail = workflowDef.createTask(sendMailTaskDef)
		const newTaskSendPackage = workflowDef.createTask(sendPackageTaskDef)

		const relationship = workflowDef.createRelationship({
			source: newTaskSendMail,
			outCome: newTaskSendMail.taskDef.outcome[0],
			target: newTaskSendPackage,
		})

		const updatedRelationship: TaskRelationship =
			workflowDef.updateRelationship(relationship.id, {
				source: newTaskSendMail,
				outCome: newTaskSendMail.taskDef.outcome[1],
				target: newTaskSendPackage,
			})
		expect(workflowDef.relationships).toEqual([updatedRelationship])
	})
	it('Báo lỗi nếu relationship có id tương ứng không tồn tại', () => {
		const { sendMailTaskDef, sendPackageTaskDef } = mock()
		const newTaskSendMail = workflowDef.createTask(sendMailTaskDef)
		const newTaskSendPackage = workflowDef.createTask(sendPackageTaskDef)

		workflowDef.createRelationship({
			source: newTaskSendMail,
			outCome: newTaskSendMail.taskDef.outcome[0],
			target: newTaskSendPackage,
		})

		try {
			workflowDef.updateRelationship('NotExistId', {
				source: newTaskSendMail,
				outCome: newTaskSendMail.taskDef.outcome[1],
				target: newTaskSendPackage,
			})
		} catch (error) {
			receivedError = error
		}
		expectError.addError({
			property: 'relationships',
			code: 'NOTFOUND',
			detailInfo: 'NotExistId',
		})
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})

	it('Báo lỗi nếu outcome không tồn tại trong source task', () => {
		const { sendMailTaskDef, sendPackageTaskDef } = mock()
		const workflowDef = new WorkflowDef()
		const newTaskSendMail = workflowDef.createTask(sendMailTaskDef)
		const newTaskSendPackage = workflowDef.createTask(sendPackageTaskDef)
		const relationship = workflowDef.createRelationship({
			source: newTaskSendMail,
			outCome: newTaskSendMail.taskDef.outcome[0],
			target: newTaskSendPackage,
		})
		const fakeOutcome: TaskOutCome = {
			outcome: 'DONE',
			subOutCome: 'fake outcome',
		}
		try {
			workflowDef.updateRelationship(relationship.id, {
				source: newTaskSendMail,
				outCome: fakeOutcome,
				target: newTaskSendPackage,
			})
		} catch (error) {
			receivedError = error
		}
		expectError.addError({
			property: 'outcome',
			code: 'NOTFOUND',
			detailInfo: fakeOutcome.id,
		})
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})

describe('workflowDef.deleteRelationship', () => {
	it('Xóa relationship', () => {
		const { sendMailTaskDef, sendPackageTaskDef } = mock()
		const workflowDef = new WorkflowDef()
		const newTaskSendMail = workflowDef.createTask(sendMailTaskDef)
		const newTaskSendPackage = workflowDef.createTask(sendPackageTaskDef)
		const relationship = workflowDef.createRelationship({
			source: newTaskSendPackage,
			outCome: newTaskSendPackage.taskDef.outcome[0],
			target: newTaskSendMail,
		})
		workflowDef.deleteRelationship(relationship.id)

		expect(workflowDef.relationships).toEqual([])
	})
	it('Báo lỗi nếu relationship có id tương ứng không tồn tại', () => {
		const { sendMailTaskDef, sendPackageTaskDef } = mock()
		const workflowDef = new WorkflowDef()
		const newTaskSendMail = workflowDef.createTask(sendMailTaskDef)
		const newTaskSendPackage = workflowDef.createTask(sendPackageTaskDef)
		workflowDef.createRelationship({
			source: newTaskSendPackage,
			outCome: newTaskSendPackage.taskDef.outcome[0],
			target: newTaskSendMail,
		})
		try {
			workflowDef.deleteRelationship('IsNotFound')
		} catch (error) {
			receivedError = error
		}
		expectError.addError({
			property: 'relationships',
			code: 'NOTFOUND',
			detailInfo: 'IsNotFound',
		})
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})

describe('WorkflowDef.createInputMapping', () => {
	it('Thêm inputMapping vào Workflow', () => {
		const { sendMailTaskDef, sendPackageTaskDef } = mock()
		const workflowDef = new WorkflowDef()
		const newTaskSendMail = workflowDef.createTask(sendMailTaskDef)
		const newTaskSendPackage = workflowDef.createTask(sendPackageTaskDef)
		workflowDef.createRelationship({
			source: newTaskSendPackage,
			outCome: newTaskSendPackage.taskDef.outcome[0],
			target: newTaskSendMail,
		})
		const newInputMapping = workflowDef.createInputMapping({
			source: {
				task: newTaskSendPackage,
				field: newTaskSendPackage.taskDef.form[0],
			},
			target: {
				task: newTaskSendMail,
				field: newTaskSendMail.taskDef.form[0],
			},
		})

		expect(workflowDef.getInputMapping(newInputMapping.id)).toEqual(
			newInputMapping,
		)
	})

	it('Báo lỗi nếu inputMapping target.field đã tồn tại', () => {
		const { sendMailTaskDef, sendPackageTaskDef } = mock()
		const workflowDef = new WorkflowDef()
		const newTaskSendMail = workflowDef.createTask(sendMailTaskDef)
		const newTaskSendPackage = workflowDef.createTask(sendPackageTaskDef)
		workflowDef.createRelationship({
			source: newTaskSendPackage,
			outCome: newTaskSendPackage.taskDef.outcome[0],
			target: newTaskSendMail,
		})
		workflowDef.createInputMapping({
			source: {
				task: newTaskSendPackage,
				field: newTaskSendPackage.taskDef.form[0],
			},
			target: {
				task: newTaskSendMail,
				field: newTaskSendMail.taskDef.form[0],
			},
		})
		try {
			workflowDef.createInputMapping({
				source: {
					task: newTaskSendPackage,
					field: newTaskSendPackage.taskDef.form[1],
				},
				target: {
					task: newTaskSendMail,
					field: newTaskSendMail.taskDef.form[0],
				},
			})
		} catch (error) {
			receivedError = error
		}
		expectError.addError({
			property: 'inputMapping',
			code: 'INVALID',
			detailInfo: {
				source: {
					task: newTaskSendPackage,
					field: newTaskSendPackage.taskDef.form[1],
				},
				target: {
					task: newTaskSendMail,
					field: newTaskSendMail.taskDef.form[0],
				},
			},
		})
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})

	it('Báo lỗi nếu source.field không tồn tại', () => {
		const { sendMailTaskDef, sendPackageTaskDef } = mock()
		const workflowDef = new WorkflowDef()
		const newTaskSendMail = workflowDef.createTask(sendMailTaskDef)
		const newTaskSendPackage = workflowDef.createTask(sendPackageTaskDef)
		workflowDef.createRelationship({
			source: newTaskSendMail,
			outCome: newTaskSendMail.taskDef.outcome[0],
			target: newTaskSendPackage,
		})
		try {
			workflowDef.createInputMapping({
				source: {
					task: newTaskSendMail,
					field: newTaskSendPackage.taskDef.form[0],
				},
				target: {
					task: newTaskSendPackage,
					field: newTaskSendPackage.taskDef.form[0],
				},
			})
		} catch (error) {
			receivedError = error
		}
		expectError.addError({
			property: 'inputMapping',
			code: 'SOURCE_FIELD_NOTFOUND',
			detailInfo: {
				source: {
					task: newTaskSendMail,
					field: newTaskSendPackage.taskDef.form[0],
				},
				target: {
					task: newTaskSendPackage,
					field: newTaskSendPackage.taskDef.form[0],
				},
			},
		})
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})

	it('Báo lỗi nếu target.field không tồn tại', () => {
		const { sendMailTaskDef, sendPackageTaskDef } = mock()
		const workflowDef = new WorkflowDef()
		const newTaskSendMail = workflowDef.createTask(sendMailTaskDef)
		const newTaskSendPackage = workflowDef.createTask(sendPackageTaskDef)
		workflowDef.createRelationship({
			source: newTaskSendMail,
			outCome: newTaskSendMail.taskDef.outcome[0],
			target: newTaskSendPackage,
		})
		try {
			workflowDef.createInputMapping({
				source: {
					task: newTaskSendMail,
					field: newTaskSendMail.taskDef.form[0],
				},
				target: {
					task: newTaskSendPackage,
					field: newTaskSendMail.taskDef.form[0],
				},
			})
		} catch (error) {
			receivedError = error
		}
		expectError.addError({
			property: 'inputMapping',
			code: 'TARGET_FIELD_NOTFOUND',
			detailInfo: {
				source: {
					task: newTaskSendMail,
					field: newTaskSendMail.taskDef.form[0],
				},
				target: {
					task: newTaskSendPackage,
					field: newTaskSendMail.taskDef.form[0],
				},
			},
		})
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})

	it('Báo lỗi nếu InputMapping source.task và target.task không có relationship', () => {
		const { sendMailTaskDef, sendPackageTaskDef } = mock()
		const workflowDef = new WorkflowDef()
		const newTaskSendMail = workflowDef.createTask(sendMailTaskDef)
		const newTaskSendPackage = workflowDef.createTask(sendPackageTaskDef)
		try {
			workflowDef.createInputMapping({
				source: {
					task: newTaskSendPackage,
					field: newTaskSendPackage.taskDef.form[0],
				},
				target: {
					task: newTaskSendMail,
					field: newTaskSendMail.taskDef.form[0],
				},
			})
		} catch (error) {
			receivedError = error
		}
		expectError.addError({
			property: 'inputMapping',
			code: 'INVALID',
			detailInfo: {
				source: {
					task: newTaskSendPackage,
					field: newTaskSendPackage.taskDef.form[0],
				},
				target: {
					task: newTaskSendMail,
					field: newTaskSendMail.taskDef.form[0],
				},
			},
		})
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})

	it('Báo lỗi nếu source.field và target.field không cùng type', () => {
		const { sendMailTaskDef, sendPackageTaskDef, numberField } = mock()
		const workflowDef = new WorkflowDef()
		const newTaskSendMail = workflowDef.createTask(sendMailTaskDef)
		const newTaskSendPackage = workflowDef.createTask(sendMailTaskDef)
		workflowDef.createRelationship({
			source: newTaskSendPackage,
			outCome: newTaskSendPackage.taskDef.getOutCome(
				newTaskSendPackage.taskDef.outcome[0].id,
			),
			target: newTaskSendMail,
		})
		try {
			workflowDef.createInputMapping({
				source: {
					task: newTaskSendPackage,
					field: newTaskSendPackage.taskDef.form[0],
				},
				target: {
					task: newTaskSendMail,
					field: newTaskSendMail.taskDef.form[1],
				},
			})
		} catch (error) {
			receivedError = error
		}
		expectError.addError({
			property: 'inputMapping',
			code: 'INVALID',
			detailInfo: {
				source: {
					task: newTaskSendPackage,
					field: newTaskSendPackage.taskDef.form[0],
				},
				target: {
					task: newTaskSendMail,
					field: newTaskSendMail.taskDef.form[1],
				},
			},
		})
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})

describe('WorkflowDef.getInputMapping', () => {
	it('Laasy inputMapping vào Workflow', () => {
		const { sendMailTaskDef, sendPackageTaskDef } = mock()
		const workflowDef = new WorkflowDef()
		const newTaskSendMail = workflowDef.createTask(sendMailTaskDef)
		const newTaskSendPackage = workflowDef.createTask(sendPackageTaskDef)

		workflowDef.createRelationship({
			source: newTaskSendMail,
			outCome: newTaskSendMail.taskDef.outcome[0],
			target: newTaskSendPackage,
		})

		const newInputMapping = workflowDef.createInputMapping({
			source: {
				task: newTaskSendMail,
				field: newTaskSendMail.taskDef.form[0],
			},
			target: {
				task: newTaskSendPackage,
				field: newTaskSendPackage.taskDef.form[0],
			},
		})
		expect(workflowDef.getInputMapping(newInputMapping.id)).toEqual(
			newInputMapping,
		)
	})

	it('Báo lỗi nếu inputMapping không tồn tại', () => {
		const { sendMailTaskDef, sendPackageTaskDef } = mock()
		const workflowDef = new WorkflowDef()
		const newTaskSendMail = workflowDef.createTask(sendMailTaskDef)
		const newTaskSendPackage = workflowDef.createTask(sendPackageTaskDef)

		workflowDef.createRelationship({
			source: newTaskSendMail,
			outCome: newTaskSendMail.taskDef.outcome[0],
			target: newTaskSendPackage,
		})
		workflowDef.createInputMapping({
			source: {
				task: newTaskSendMail,
				field: newTaskSendMail.taskDef.form[0],
			},
			target: {
				task: newTaskSendPackage,
				field: newTaskSendPackage.taskDef.form[0],
			},
		})
		try {
			workflowDef.getInputMapping('abcd')
		} catch (error) {
			receivedError = error
		}
		expectError.addError({
			property: 'inputMapping',
			code: 'NOTFOUND',
			detailInfo: 'abcd',
		})
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})

describe('WorkflowDef.updateInputMapping', () => {
	it('Sửa inputMapping', () => {
		const { sendMailTaskDef, sendPackageTaskDef } = mock()
		const workflowDef = new WorkflowDef()
		const newTaskSendMail = workflowDef.createTask(sendMailTaskDef)
		const newTaskSendPackage = workflowDef.createTask(sendPackageTaskDef)

		workflowDef.createRelationship({
			source: newTaskSendMail,
			outCome: newTaskSendMail.taskDef.outcome[0],
			target: newTaskSendPackage,
		})
		const newInputMapping = workflowDef.createInputMapping({
			source: {
				task: newTaskSendMail,
				field: newTaskSendMail.taskDef.form[0],
			},
			target: {
				task: newTaskSendPackage,
				field: newTaskSendPackage.taskDef.form[0],
			},
		})
		const updateInputMapping = workflowDef.updateInputMapping(
			newInputMapping.id,
			{
				source: {
					task: newTaskSendMail,
					field: newTaskSendMail.taskDef.form[1],
				},
				target: {
					task: newTaskSendPackage,
					field: newTaskSendPackage.taskDef.form[1],
				},
			},
		)

		expect(workflowDef.getInputMapping(newInputMapping.id)).toEqual(
			updateInputMapping,
		)
	})
	it('Báo lỗi nếu inputMapping không tồn tại', () => {
		const { sendMailTaskDef, sendPackageTaskDef } = mock()
		const workflowDef = new WorkflowDef()
		const newTaskSendMail = workflowDef.createTask(sendMailTaskDef)
		const newTaskSendPackage = workflowDef.createTask(sendPackageTaskDef)

		workflowDef.createRelationship({
			source: newTaskSendMail,
			outCome: newTaskSendMail.taskDef.outcome[0],
			target: newTaskSendPackage,
		})

		const newInputMapping = workflowDef.createInputMapping({
			source: {
				task: newTaskSendMail,
				field: newTaskSendMail.taskDef.form[0],
			},
			target: {
				task: newTaskSendPackage,
				field: newTaskSendPackage.taskDef.form[0],
			},
		})
		try {
			workflowDef.updateInputMapping('abc', {
				source: {
					task: newTaskSendMail,
					field: newTaskSendMail.taskDef.form[1],
				},
				target: {
					task: newTaskSendPackage,
					field: newTaskSendPackage.taskDef.form[1],
				},
			})
		} catch (error) {
			receivedError = error
		}
		expectError.addError({
			property: 'inputMapping',
			code: 'NOTFOUND',
			detailInfo: 'abc',
		})
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
	it('Báo lỗi nếu inputMapping đã tồn tại', () => {
		const { sendMailTaskDef, sendPackageTaskDef } = mock()
		const workflowDef = new WorkflowDef()
		const newTaskSendMail = workflowDef.createTask(sendMailTaskDef)
		const newTaskSendPackage = workflowDef.createTask(sendPackageTaskDef)

		workflowDef.createRelationship({
			source: newTaskSendMail,
			outCome: newTaskSendMail.taskDef.outcome[0],
			target: newTaskSendPackage,
		})
		workflowDef.createInputMapping({
			source: {
				task: newTaskSendMail,
				field: newTaskSendMail.taskDef.form[0],
			},
			target: {
				task: newTaskSendPackage,
				field: newTaskSendPackage.taskDef.form[0],
			},
		})
		const newInputMapping = workflowDef.createInputMapping({
			source: {
				task: newTaskSendMail,
				field: newTaskSendMail.taskDef.form[1],
			},
			target: {
				task: newTaskSendPackage,
				field: newTaskSendPackage.taskDef.form[1],
			},
		})
		try {
			workflowDef.updateInputMapping(newInputMapping.id, {
				source: {
					task: newTaskSendMail,
					field: newTaskSendMail.taskDef.form[0],
				},
				target: {
					task: newTaskSendPackage,
					field: newTaskSendPackage.taskDef.form[0],
				},
			})
		} catch (error) {
			receivedError = error
		}
		expectError.addError({
			property: 'inputMapping',
			code: 'ISEXIST',
			detailInfo: {
				source: {
					task: newTaskSendMail,
					field: newTaskSendMail.taskDef.form[0],
				},
				target: {
					task: newTaskSendPackage,
					field: newTaskSendPackage.taskDef.form[0],
				},
			},
		})
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})

describe('WorkflowDef.deleteInputMapping', () => {
	it('Xóa inputmapping', () => {
		const { sendMailTaskDef, sendPackageTaskDef } = mock()
		const workflowDef = new WorkflowDef()
		const newTaskSendMail = workflowDef.createTask(sendMailTaskDef)
		const newTaskSendPackage = workflowDef.createTask(sendPackageTaskDef)
		workflowDef.createRelationship({
			source: newTaskSendPackage,
			outCome: newTaskSendPackage.taskDef.outcome[0],
			target: newTaskSendMail,
		})
		const newInputMapping = workflowDef.createInputMapping({
			source: {
				task: newTaskSendPackage,
				field: newTaskSendPackage.taskDef.form[0],
			},
			target: {
				task: newTaskSendMail,
				field: newTaskSendMail.taskDef.form[0],
			},
		})
		workflowDef.deleteInputMapping(newInputMapping.id)

		expect(workflowDef.inputMapping).toEqual([])
	})
	it('Báo lỗi nếu input mapping không tồn tại', () => {
		const { sendMailTaskDef, sendPackageTaskDef } = mock()
		const workflowDef = new WorkflowDef()
		const newTaskSendMail = workflowDef.createTask(sendMailTaskDef)
		const newTaskSendPackage = workflowDef.createTask(sendPackageTaskDef)
		workflowDef.createRelationship({
			source: newTaskSendPackage,
			outCome: newTaskSendPackage.taskDef.outcome[0],
			target: newTaskSendMail,
		})
		const newInputMapping = workflowDef.createInputMapping({
			source: {
				task: newTaskSendPackage,
				field: newTaskSendPackage.taskDef.form[0],
			},
			target: {
				task: newTaskSendMail,
				field: newTaskSendMail.taskDef.form[0],
			},
		})
		try {
			workflowDef.deleteInputMapping('isNotFound')
		} catch (error) {
			receivedError = error
		}
		expectError.addError({
			property: 'inputMapping',
			code: 'NOTFOUND',
			detailInfo: 'isNotFound',
		})
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})

// describe('WorkflowDef.findSourceAvailable', () => {
// 	it('Tìm tất cả các task có quan hệ phía trước nó', () => {
// 		const { taskDef } = mock()
// 		const { taskDef1 } = mock1()
// 		const workflowDef = new WorkflowDef()
// 		const one = workflowDef.createTask(taskDef)
// 		const two = workflowDef.createTask(taskDef1)
// 		const three = workflowDef.createTask(taskDef1)
// 		const four = workflowDef.createTask(taskDef)
// 		const five = workflowDef.createTask(taskDef)
// 		const six = workflowDef.createTask(taskDef)

// 		workflowDef.createRelationship({
// 			source: one,
// 			outCome: one.taskDef.getOutCome(Object.keys(one.taskDef.outcome)[0]),
// 			target: two,
// 		})

// 		workflowDef.createRelationship({
// 			source: one,
// 			outCome: one.taskDef.getOutCome(Object.keys(one.taskDef.outcome)[0]),
// 			target: three,
// 		})

// 		workflowDef.createRelationship({
// 			source: two,
// 			outCome: two.taskDef.getOutCome(Object.keys(two.taskDef.outcome)[0]),
// 			target: three,
// 		})

// 		workflowDef.createRelationship({
// 			source: two,
// 			outCome: two.taskDef.getOutCome(Object.keys(two.taskDef.outcome)[0]),
// 			target: four,
// 		})

// 		workflowDef.createRelationship({
// 			source: five,
// 			outCome: five.taskDef.getOutCome(Object.keys(five.taskDef.outcome)[0]),
// 			target: six,
// 		})

// 		expect(
// 			compareTwoArray(workflowDef.findSourcesAvailable(one), [one.id]),
// 		).toEqual(true)
// 		expect(
// 			compareTwoArray(workflowDef.findSourcesAvailable(two), [two.id, one.id]),
// 		).toEqual(true)
// 		expect(
// 			compareTwoArray(workflowDef.findSourcesAvailable(three), [
// 				three.id,
// 				two.id,
// 				one.id,
// 			]),
// 		).toEqual(true)
// 		expect(
// 			compareTwoArray(workflowDef.findSourcesAvailable(four), [
// 				one.id,
// 				two.id,
// 				four.id,
// 			]),
// 		).toEqual(true)
// 		expect(
// 			compareTwoArray(workflowDef.findSourcesAvailable(five), [five.id]),
// 		).toEqual(true)
// 	})
// })

describe('workFlowDef.build', () => {
	it('Báo lỗi nếu task = {}', () => {
		const workflowDef = WorkflowDef.builder()
		expectError.addError({
			property: 'tasks',
			code: 'ISEMPTY',
		})
		try {
			workflowDef.build()
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
	it('Báo lỗi có inputmapping có source và target không hợp lệ', () => {
		const { sendMailTaskDef, sendPackageTaskDef } = mock()
		const newTaskDef = TaskDef.builder()
		const stringField = FieldDef.builder()
		stringField.setCode('NAME')
		stringField.setName('Name')
		stringField.setType({
			target: 'string',
			type: 'SCALAR',
		})
		const numberField = FieldDef.builder()
		numberField.setCode('AGE')
		numberField.setName('age')
		numberField.setType({
			target: 'number',
			type: 'SCALAR',
		})

		newTaskDef.createField(stringField)
		newTaskDef.createField(numberField)
		newTaskDef.createOutCome({
			outcome: 'DONE',
			subOutCome: 'Gửi thành công',
		})
		newTaskDef.createOutCome({
			outcome: 'DONE',
			subOutCome: 'Gửi không thành công',
		})

		const workflowDef = new WorkflowDef()
		const one = workflowDef.createTask(sendMailTaskDef)
		const two = workflowDef.createTask(sendPackageTaskDef)
		const three = workflowDef.createTask(newTaskDef)

		workflowDef.createRelationship({
			source: one,
			outCome: one.taskDef.outcome[0],
			target: two,
		})

		workflowDef.createRelationship({
			source: two,
			outCome: two.taskDef.outcome[0],
			target: three,
		})
		const onethree = workflowDef.createInputMapping({
			source: {
				task: one,
				field: one.taskDef.form[0],
			},
			target: {
				task: three,
				field: three.taskDef.form[0],
			},
		})
		const onetwo = workflowDef.createInputMapping({
			source: {
				task: one,
				field: one.taskDef.form[0],
			},
			target: {
				task: two,
				field: two.taskDef.form[0],
			},
		})

		workflowDef.deleteTask(two.id)
		expectError.addError({
			property: 'inputMapping',
			code: 'CANT_CONNECT',
			detailInfo: onethree,
		})
		expectError.addError({
			property: 'inputMapping',
			code: 'CANT_CONNECT',
			detailInfo: onetwo,
		})
		try {
			workflowDef.build()
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
	it('Báo lỗi nếu các trường invalid', () => {
		expectError.addError({
			property: 'tasks',
			code: 'ISEMPTY',
		})
		expectError.addError({
			property: 'inputMapping',
			code: 'ISEMPTY',
		})
		expectError.addError({
			property: 'relationships',
			code: 'ISEMPTY',
		})
		try {
			workflowDef.build()
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})
