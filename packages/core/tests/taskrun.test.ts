import { FieldValue } from '@src/models/FieldValue.model'
import { AgentGroup, FieldDef, TaskDef, WorkflowDef } from '@src/models'
import { TaskRun } from '@src/models/TaskRun.model'
import { TaskRunError } from '@src/models/exceptions/taskrun.error'

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
		name: 'Nguyen Van A',
		email: 'NguyenVanA@gmail.com',
	})
	mockAgent1.addMember({
		name: 'Nguyen Van B',
		email: 'NguyenVanB@gmail.com',
	})
	mockAgent1.addMember({
		name: 'Nguyen Van C',
		email: 'NguyenVanC@gmail.com',
	})
	mockAgent1.setLeader({
		name: 'Nguyen Van A',
		email: 'NguyenVanA@gmail.com',
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
	sendMailTaskDef.setCode('SEND_PACKAGE')
	sendMailTaskDef.setName('send package')
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

	const workflowDef = WorkflowDef.builder()
	const sendMailTask = workflowDef.createTask(sendMailTaskDef)
	const sendPackageTask = workflowDef.createTask(sendPackageTaskDef)

	return {
		sendMailTask,
		sendPackageTask,
		stringField,
		numberField,
	}
}

let taskRun: TaskRun
let expectError = new TaskRunError()
let receivedError = new TaskRunError()

beforeEach(() => {
	taskRun = new TaskRun()
	expectError = new TaskRunError()
	receivedError = new TaskRunError()
})

describe('TaskRun.createFormValue', () => {
	it('Gán Task cho TaskRun', () => {
		const { sendMailTask } = mock()
		taskRun.createFormValue(sendMailTask)
		expect(taskRun.task).toEqual(sendMailTask)
	})
	it('Gen ra formValue với giá trị rỗng tương ướng với MasterDataDef', () => {
		const { sendMailTask } = mock()
		taskRun.createFormValue(sendMailTask)
		const fieldValueA = new FieldValue()
		fieldValueA.setFieldDef(sendMailTask.taskDef.form[0])
		const fieldValueB = new FieldValue()
		fieldValueB.setFieldDef(sendMailTask.taskDef.form[1])
		expect(taskRun.form).toEqual([fieldValueA, fieldValueB])
	})
})

describe('TaskRun.getFormValue', () => {
	it('Trả về giá trị của field của code truyền vào', () => {
		const { sendMailTask } = mock()
		taskRun.createFormValue(sendMailTask)
		const fieldValueA = new FieldValue()
		fieldValueA.setFieldDef(sendMailTask.taskDef.form[0])
		expect(taskRun.getFormValue(sendMailTask.taskDef.form[0].code)).toEqual(
			fieldValueA,
		)
	})
	it('Báo lỗi Nếu field của code không tồn tại - TaskRunError {property: "form", code: "NOTFOUND", detailInfo: param.code}', () => {
		const { sendMailTask } = mock()
		taskRun.createFormValue(sendMailTask)
		const fieldValueA = new FieldValue()
		fieldValueA.setFieldDef(sendMailTask.taskDef.form[0])
		try {
			taskRun.getFormValue('abc')
		} catch (error) {
			receivedError = error
		}
		expectError.addError({
			property: 'form',
			code: 'NOTFOUND',
			detailInfo: 'abc',
		})
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})

describe('TaskRun.setAssignee', () => {
	it('Gán người được phân công cho task', () => {
		const { sendMailTask } = mock()
		taskRun.createFormValue(sendMailTask)
		const agentGroup = sendMailTask.taskDef.agentGroup
		taskRun.setAssignee(agentGroup.members[0])
		expect(taskRun.assignee).toEqual(agentGroup.members[0])
	})
	it("Báo lỗi nếu người được phân công không nằm trong agent member - TaskRunError {property: 'assignee', code: 'INVALID', detailInfo: param.emp}", () => {
		const { sendMailTask } = mock()
		taskRun.createFormValue(sendMailTask)
		sendMailTask.taskDef.agentGroup
		try {
			taskRun.setAssignee({
				email: 'abc@gmail',
				name: 'abc',
			})
		} catch (error) {
			receivedError = error
		}
		expectError.addError({
			property: 'assignee',
			code: 'INVALID',
			detailInfo: {
				email: 'abc@gmail',
				name: 'abc',
			},
		})
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})

describe('TaskRun.capability', () => {
	it('canAssign: Trả về true nếu employee truyền vào là leader', () => {
		const { sendMailTask } = mock()
		taskRun.createFormValue(sendMailTask)
		const agentGroup = sendMailTask.taskDef.agentGroup
		expect(taskRun.canAssign(agentGroup.leader)).toEqual(true)
	})
	it('canChangeStatus: Trả về true nếu employee truyền vào là leader & assignee', () => {
		const { sendMailTask } = mock()
		taskRun.createFormValue(sendMailTask)
		const agentGroup = sendMailTask.taskDef.agentGroup
		expect(taskRun.canChangeStatus(agentGroup.leader)).toEqual(true)
		expect(taskRun.canChangeStatus(agentGroup.members[1])).toEqual(true)
	})
	it('canFillForm: Trả về true nếu employee truyền vào là leader & assignee', () => {
		const { sendMailTask } = mock()
		taskRun.createFormValue(sendMailTask)
		const agentGroup = sendMailTask.taskDef.agentGroup
		expect(taskRun.canFillForm(agentGroup.leader)).toEqual(true)
		expect(taskRun.canFillForm(agentGroup.members[1])).toEqual(true)
	})
})

describe('Taskrun.build', () => {
	it('Báo lỗi nếu không có task', () => {
		expectError.addError({
			property: 'task',
			code: 'INVALID',
		})
		try {
			taskRun.build()
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
	it('Báo lỗi nếu không có assignee', () => {
		const { sendMailTask } = mock()
		taskRun.createFormValue(sendMailTask)
		expectError.addError({
			property: 'assignee',
			code: 'INVALID',
		})
		try {
			taskRun.build()
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})
