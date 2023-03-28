import { TaskRun } from '@src/models/TaskRun.model'
import {
	AgentGroup,
	FieldDef,
	TaskDef,
	WorkflowRun,
	TaskOutCome,
	Employee,
	WorkflowDef,
} from '../src/models'
import { WorkflowRunError } from '../src/models/exceptions'
const workflowMock = () => {
	const { mockTaskDefSendMail } = mock()
	const { mockTaskDefInterview } = mock1()
	const workflowDef = new WorkflowDef()
	const one = workflowDef.createTask(mockTaskDefSendMail)
	const two = workflowDef.createTask(mockTaskDefInterview)
	const three = workflowDef.createTask(mockTaskDefInterview)
	const four = workflowDef.createTask(mockTaskDefInterview)
	const five = workflowDef.createTask(mockTaskDefInterview)
	const six = workflowDef.createTask(mockTaskDefInterview)

	workflowDef.createRelationship({
		source: one,
		outCome: one.taskDef.outcome[0],
		target: two,
	})
	workflowDef.createRelationship({
		source: one,
		outCome: one.taskDef.outcome[0],
		target: three,
	})
	workflowDef.createRelationship({
		source: four,
		outCome: four.taskDef.outcome[0],
		target: three,
	})
	workflowDef.createRelationship({
		source: one,
		outCome: one.taskDef.outcome[1],
		target: five,
	})
	workflowDef.createRelationship({
		source: one,
		outCome: one.taskDef.outcome[0],
		target: six,
	})
	workflowDef.createInputMapping({
		source: {
			task: one,
			field: one.taskDef.form[0],
		},
		target: {
			task: two,
			field: two.taskDef.form[0],
		},
	})
	return { workflowDef }
}

const field1 = FieldDef.builder()
field1.setName('user')
field1.setType({
	type: 'SCALAR',
	target: 'string',
})
const field2 = FieldDef.builder()
field2.setName('age')
field2.setType({
	type: 'SCALAR',
	target: 'number',
})
const compareTwoArray = (a: any[], b: any[]) =>
	a.length === b.length && a.every(v => b.includes(v))

const mock = () => {
	const mockOutCome: TaskOutCome[] = [
		{
			outcome: 'DONE',
			subOutCome: 'Gửi thành công',
		},
		{
			outcome: 'FAIL',
			subOutCome: 'Gửi thất bại',
		},
	]
	const mockFiledScalarNumber = FieldDef.builder()
	mockFiledScalarNumber.setName('abc')
	mockFiledScalarNumber.setCode('ABC')
	mockFiledScalarNumber.setType({ type: 'SCALAR', target: 'number' })
	const mockFiledScalarString = FieldDef.builder()
	mockFiledScalarString.setName('qwe')
	mockFiledScalarString.setCode('QWE')
	mockFiledScalarString.setType({ type: 'SCALAR', target: 'string' })
	const mockFiledScalarStringCodeDuplicate = FieldDef.builder()
	mockFiledScalarStringCodeDuplicate.setName('xyz')
	mockFiledScalarStringCodeDuplicate.setCode('ABC')
	mockFiledScalarStringCodeDuplicate.setType({
		type: 'SCALAR',
		target: 'string',
	})
	const mockEmplopyees = (): Employee[] => {
		return [
			{ email: 'andeatran@gmail.com', name: 'Tran Diep Phuong Vy' },
			{ email: 'beo1692@gmail.com', name: 'Pham Nhat Tien' },
			{ email: 'tienpn@inter-k.com', name: 'Pham Tien' },
		]
	}
	const mockEmplopyee = mockEmplopyees()

	const mockAgent = AgentGroup.builder()
	mockAgent.setId('UUIDV4')
	mockAgent.setName('DC OCD')
	mockAgent.setCode('DC_OCD')
	mockAgent.addMember(mockEmplopyee[0])
	mockAgent.addMember(mockEmplopyee[1])
	mockAgent.addMember(mockEmplopyee[2])
	mockAgent.setLeader(mockEmplopyee[2])

	const mockTaskDefSendMail = TaskDef.builder()
	mockTaskDefSendMail.setCode('SEND_MAIL')
	mockTaskDefSendMail.setName('Send mail')
	mockTaskDefSendMail.createField(mockFiledScalarNumber)
	mockTaskDefSendMail.createField(mockFiledScalarString)
	mockTaskDefSendMail.setAgentGroup(mockAgent)
	mockTaskDefSendMail.createOutCome(mockOutCome[0])
	mockTaskDefSendMail.createOutCome(mockOutCome[1])
	return {
		mockTaskDefSendMail,
		mockFiledScalarStringCodeDuplicate,
		mockFiledScalarNumber,
		mockFiledScalarString,
	}
}
const mock1 = () => {
	const mockOutCome: TaskOutCome[] = [
		{
			outcome: 'DONE',
			subOutCome: 'Gửi thành công',
		},
		{
			outcome: 'DONE',
			subOutCome: 'Đậu',
		},
		{
			outcome: 'FAIL',
			subOutCome: 'Không thành công',
		},
	]
	const mockFiledScalarNumber = FieldDef.builder()
	mockFiledScalarNumber.setName('abc')
	mockFiledScalarNumber.setCode('ABC')
	mockFiledScalarNumber.setType({ type: 'SCALAR', target: 'number' })
	const mockFiledScalarString = FieldDef.builder()
	mockFiledScalarString.setName('qwe')
	mockFiledScalarString.setCode('QWE')
	mockFiledScalarString.setType({ type: 'SCALAR', target: 'string' })
	const mockEmplopyees = (): Employee[] => {
		return [
			{ email: 'andeatran@gmail.com', name: 'Tran Diep Phuong Vy' },
			{ email: 'beo1692@gmail.com', name: 'Pham Nhat Tien' },
			{ email: 'tienpn@inter-k.com', name: 'Pham Tien' },
		]
	}
	const mockEmplopyee = mockEmplopyees()

	const mockAgent = AgentGroup.builder()
	mockAgent.setId('UUIDV4')
	mockAgent.setName('DC OCD')
	mockAgent.setCode('DC_OCD')
	mockAgent.addMember(mockEmplopyee[0])
	mockAgent.addMember(mockEmplopyee[1])
	mockAgent.addMember(mockEmplopyee[2])
	mockAgent.setLeader(mockEmplopyee[2])

	const mockTaskDefInterview = TaskDef.builder()
	mockTaskDefInterview.setCode('INTERVIEW')
	mockTaskDefInterview.setName('Interview')
	mockTaskDefInterview.createField(mockFiledScalarNumber)
	mockTaskDefInterview.createField(mockFiledScalarString)
	mockTaskDefInterview.setAgentGroup(mockAgent)
	mockTaskDefInterview.createOutCome(mockOutCome[0])
	mockTaskDefInterview.createOutCome(mockOutCome[1])
	mockTaskDefInterview.createOutCome(mockOutCome[2])

	return {
		mockTaskDefInterview,
	}
}

let workflowRun: WorkflowRun
let expectError = new WorkflowRunError()
let receivedError = new WorkflowRunError()

beforeEach(() => {
	workflowRun = new WorkflowRun()
	expectError = new WorkflowRunError()
	receivedError = new WorkflowRunError()
})

describe('WorkflowRun.setWorkflowDef', () => {
	it('Gán WorkflowDef cho WorkflowRun', () => {
		const { workflowDef } = workflowMock()
		workflowRun.setWorkflowDef(workflowDef)
		expect(workflowRun.workflowDef).toEqual(workflowDef)
	})

	it('Gán WorkflowDef cho WorkflowRun Gen danh sách TaskRun dựa vào danh sách TaskDef của WorkflowDef', () => {
		const { workflowDef } = workflowMock()
		const ids = workflowRun.setWorkflowDef(workflowDef).map(i => i.id)

		console.log(workflowRun.taskRun)
		expect(workflowRun.taskRun).toEqual(
			ids.map((i, index) => ({
				...(() => {
					const taskrun = TaskRun.builder()
					taskrun.createFormValue(workflowDef.tasks[index])
					return taskrun
				})(),
				_id: i,
			})),
		)
	})
})
describe('WorkflowRun.getTaskRun', () => {
	it('Lấy TaskRun của id truyền vào', () => {
		const { workflowDef } = workflowMock()
		workflowRun.setWorkflowDef(workflowDef)

		expect(workflowRun.getTaskRun(workflowRun.taskRun[0].id)).toEqual(
			workflowRun.taskRun[0],
		)
	})
	it('Báo lỗi nếu TaskRun của id không tồn tại', () => {
		const { workflowDef } = workflowMock()
		workflowRun.setWorkflowDef(workflowDef)
		expectError.addError({
			property: 'taskrun',
			code: 'NOTFOUND',
			detailInfo: 'abc',
		})
		try {
			workflowRun.getTaskRun('abc')
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})

describe('WorkflowRun.next', () => {
	it('Chuyển status taskRun done và mở open taskRun tiếp theo', () => {
		const { workflowDef } = workflowMock()
		const taskRuns = workflowRun.setWorkflowDef(workflowDef)
		const one = taskRuns[0]
		const two = taskRuns[1]
		const three = taskRuns[2]
		const four = taskRuns[3]
		const five = taskRuns[4]
		const six = taskRuns[5]

		one.setStatus('DONE')
		workflowRun.next(one, one.task.taskDef.outcome[0])
		expect(one.status).toEqual('CLOSED')
		expect(two.status).toEqual('OPEN')
		expect(six.status).toEqual('OPEN')
		expect(three.status).toEqual('PENDING')
		expect(four.status).toEqual('PENDING')
		expect(five.status).toEqual('PENDING')
	})
	it('Nếu là task cuối', () => {
		const { workflowDef } = workflowMock()
		const taskRuns = workflowRun.setWorkflowDef(workflowDef)
		const interViewTask = taskRuns.find(
			i => i.task.taskDef.code === 'INTERVIEW',
		)
		interViewTask.setStatus('DONE')
		workflowRun.next(interViewTask, interViewTask.task.taskDef.outcome[0])
		expect(interViewTask.status).toEqual('CLOSED')
	})
	it('Nếu outcome và status hiện taị không trung nhau', () => {
		const { workflowDef } = workflowMock()
		const taskRuns = workflowRun.setWorkflowDef(workflowDef)
		const interViewTask = taskRuns.find(
			i => i.task.taskDef.code === 'INTERVIEW',
		)
		interViewTask.setStatus('DONE')
		try {
			workflowRun.next(interViewTask, interViewTask.task.taskDef.outcome[2])
		} catch (error) {
			receivedError = error
		}
		expectError.addError({ property: 'taskRun', code: 'INVALID_OUTCOME' })
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})

describe('WorkflowRun.build', () => {
	it('nếu trường workflowDef chưa có gía trị', () => {
		expectError.addError({
			property: 'workflowDef',
			code: 'ISEMPTY',
		})
		try {
			workflowRun.build()
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})

describe('WorkflowRun.build', () => {
	it('nếu trường taskRun chưa có gía trị', () => {})
	it('nếu trường workflowDef chưa có gía trị', () => {})
})
