import {
	AgentGroup,
	Employee,
	FieldDef,
	FieldValue,
	TaskDef,
	TaskOutCome,
	TicketRun,
	TicketDef,
	WorkflowDef,
	WorkflowRun,
} from '@src/models'
import { TicketRunError } from '@src/models/exceptions'

const ticketDefMock = () => {
	const { workflowDef } = workflowMock()
	const ticketDef = TicketDef.builder()
	ticketDef.setCode('TUYEN_DUNG')
	ticketDef.setName('Tuyen Dung')
	ticketDef.createWorkFlowDef(workflowDef)
	const age = FieldDef.builder()
	age.setName('AGE')
	age.setCode('AGE')
	age.setType({
		type: 'SCALAR',
		target: 'number',
	})
	const phone = FieldDef.builder()
	phone.setName('Phone')
	phone.setCode('PHONE')
	phone.setType({
		type: 'SCALAR',
		target: 'number',
	})
	ticketDef.createField(age)
	ticketDef.createField(phone)
	return {
		ticketDef,
	}
}

const workflowMock = () => {
	const { mockTaskDefSendMail } = mock()
	const { mockTaskDefInterview } = mock1()
	const workflowDef = new WorkflowDef()
	const one = workflowDef.createTask(mockTaskDefSendMail)
	const two = workflowDef.createTask(mockTaskDefInterview)
	const three = workflowDef.createTask(mockTaskDefInterview)
	const four = workflowDef.createTask(mockTaskDefInterview)
	const five = workflowDef.createTask(mockTaskDefInterview)
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
		target: five,
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
	return {
		workflowDef,
	}
}

const field1 = FieldDef.builder()
field1.setName('user')
field1.setCode('USER')
field1.setType({
	type: 'SCALAR',
	target: 'string',
})
const field2 = FieldDef.builder()
field2.setName('age')
field2.setCode('AGE')
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
			outcome: 'DONE',
			subOutCome: 'Rớt',
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

let ticketrun: TicketRun
let expectError = new TicketRunError()
let receivedError = new TicketRunError()

beforeEach(() => {
	ticketrun = new TicketRun()
	expectError = new TicketRunError()
	receivedError = new TicketRunError()
})

describe('Ticket.setName', () => {
	it('Đặt tên cho ticket', () => {
		ticketrun.setName('abc')

		expect(ticketrun.name).toEqual('abc')
	})

	it('Tên sẽ được Trim dấu cách', () => {
		ticketrun.setName(' hello      abc   xxx    ')

		expect(ticketrun.name).toEqual('hello abc xxx')
	})
	it('Báo lỗi nếu tên công việc có ký tự đặc biệt', () => {
		expectError.addError({
			property: 'name',
			code: 'SPECIALCHARS',
		})
		try {
			ticketrun.setName('Abc @#$@$')
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})

describe('Ticket.setCode', () => {
	it('Set code viết hoa toàn bộ ticket', () => {
		ticketrun.setCode('abc')

		expect(ticketrun.code).toEqual('ABC')
	})
	it('Code được xóa khoảng trắng trước sau.', () => {
		ticketrun.setCode('         abc             ')

		expect(ticketrun.code).toEqual('ABC')
	})
	it('Code được thay thế các khoảng trắng bằng dấu gạch dưới', () => {
		const taskDef = TaskDef.builder()
		taskDef.setCode('abc      zxc    tret')

		expect(taskDef.code).toEqual('ABC_ZXC_TRET')
	})
	it('Báo lỗi nếu code truyền vào có giá trị đặc biệt', () => {
		expectError.addError({
			property: 'code',
			code: 'SPECIALCHARS',
		})
		try {
			ticketrun.setCode('Abc @#$@$')
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})

describe('Ticket.setTicketDef', () => {
	it('Gán TicketDef cho Ticket', () => {
		const { ticketDef } = ticketDefMock()
		ticketrun.setTicketDef(ticketDef)

		expect(ticketrun.ticketDef).toEqual(ticketDef)
	})

	it('Gen danh sách FieldValue dựa vào danh sách FieldDef của TicketDef', () => {
		const { ticketDef } = ticketDefMock()
		ticketrun.setTicketDef(ticketDef)
		const fieldValueA = new FieldValue()
		fieldValueA.setFieldDef(ticketDef.form[0])
		const fieldValueB = new FieldValue()
		fieldValueB.setFieldDef(ticketDef.form[1])
		expect(ticketrun.formValue).toEqual([fieldValueA, fieldValueB])
	})
	it('Tạo workflowRun dựa theo workflowDef của ticketDef', () => {
		const { ticketDef } = ticketDefMock()
		ticketrun.setTicketDef(ticketDef)

		const workflowRun = WorkflowRun.builder()
		workflowRun.setWorkflowDef(ticketDef.workflow)

		expect(ticketrun.workflowrun.workflowDef).toEqual(workflowRun.workflowDef)
	})
})

describe('ticketrun.getFormValue', () => {
	it('Trả về giá trị của field của code truyền vào', () => {
		const { ticketDef } = ticketDefMock()
		ticketrun.setTicketDef(ticketDef)
		const fieldValueA = new FieldValue()
		fieldValueA.setFieldDef(ticketDef.form[0])
		expect(ticketrun.getFormValue(ticketDef.form[0].code)).toEqual(fieldValueA)
	})

	it('Báo lỗi nếu field của code không tồn tại', () => {
		const { ticketDef } = ticketDefMock()
		ticketrun.setTicketDef(ticketDef)
		const fieldValueA = new FieldValue()
		fieldValueA.setFieldDef(ticketDef.form[0])
		try {
			ticketrun.getFormValue('abc')
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

describe('ticketrun.build', () => {
	it('Nếu name chưa có giá trị', () => {
		const { ticketDef } = ticketDefMock()
		ticketrun.setTicketDef(ticketDef)
		ticketrun.setCode('TUYEN_DUNG_NGUYEN_VAN_B')
		expectError.addError({
			property: 'name',
			code: 'ISEMPTY',
		})
		try {
			ticketrun.build()
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})

	it('Nếu code chưa có giá trị', () => {
		const { ticketDef } = ticketDefMock()
		ticketrun.setTicketDef(ticketDef)
		ticketrun.setName('Tuyen Dung Nguyen Van B')
		expectError.addError({
			property: 'code',
			code: 'ISEMPTY',
		})
		try {
			ticketrun.build()
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})

	it('Nếu form chưa có giá trị', () => {
		ticketrun.setName('Tuyen Dung Nguyen Van B')
		ticketrun.setCode('TUYEN_DUNG_NGUYEN_VAN_B')
		expectError.addError({
			property: 'form',
			code: 'ISEMPTY',
		})
		try {
			ticketrun.build()
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})

describe('TicketDef.setStatus', () => {
	it('OPEN: được gán khi khởi tạo', () => {
		expect(ticketrun.status).toEqual('OPEN')
	})
	it('điều kiện value trong form đã được điền đầy đủ.', () => {
		const { ticketDef } = ticketDefMock()
		ticketrun.setTicketDef(ticketDef)
		try {
			ticketrun.setStatus('INPROGRESS')
		} catch (error) {
			receivedError = error
		}
		ticketrun.formValue.map(i => {
			expectError.addError({
				property: 'status',
				code: 'FIELDVALUE_NOTREADY',
				detailInfo: i.fieldDef.code,
			})
		})
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
	it('INPROGRESS:Sau khi set tất cả các task đầu tiên được gán thành "OPEN"', () => {
		const { ticketDef } = ticketDefMock()
		ticketrun.setTicketDef(ticketDef)
		ticketrun.setRequester({
			email: 'nguyenvanadmin@gmail.com',
			name: 'Nguyễn Văn Admin',
		})

		ticketrun.formValue[0].setValue(4)
		ticketrun.formValue[1].setValue(4)
		ticketrun.setStatus('INPROGRESS')

		expect(ticketrun.workflowrun.taskRun[0].status).toEqual('OPEN')
		expect(ticketrun.workflowrun.taskRun[3].status).toEqual('OPEN')
	})
	it('DONE: Tất cả các task cuối cùng phải DONE', () => {
		const { ticketDef } = ticketDefMock()
		ticketrun.setTicketDef(ticketDef)
		ticketrun.workflowrun.taskRun[4].setStatus('DONE')
		ticketrun.formValue[0].setValue(4)
		ticketrun.formValue[1].setValue(4)
		try {
			ticketrun.setStatus('DONE')
		} catch (error) {
			receivedError = error
		}
		expectError.addError({
			property: 'status',
			code: 'WORKFLOWRUN_NOTREADY',
			detailInfo: ticketrun.workflowrun.taskRun[1],
		})
		expectError.addError({
			property: 'status',
			code: 'WORKFLOWRUN_NOTREADY',
			detailInfo: ticketrun.workflowrun.taskRun[2],
		})
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})

describe('TicketRun.setRequester', () => {
	it('Gán người raise ticket', () => {
		ticketrun.setRequester({
			email: 'nguyenvanadmin@gmail.com',
			name: 'Nguyễn Văn Admin',
		})

		expect(ticketrun.requester).toEqual({
			email: 'nguyenvanadmin@gmail.com',
			name: 'Nguyễn Văn Admin',
		})
	})
})
