import { WorkflowDef, FieldDef, TaskDef, TicketDef } from '@src/models'
import { AgentGroup, Employee } from '@src/models/AgentGroup.model'
import { TicketDefError } from '@src/models/exceptions/ticketdef.error'
import { TaskOutCome } from '@src/models/type'

const workflowMock = () => {
	const { mockTaskDefSendMail } = mock()
	const { mockTaskDefInterview } = mock1()
	const workflowDef = new WorkflowDef()
	const one = workflowDef.createTask(mockTaskDefSendMail)
	const two = workflowDef.createTask(mockTaskDefInterview)

	workflowDef.createRelationship({
		source: one,
		outCome: one.taskDef.outcome[0],
		target: two,
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
	return workflowDef
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

let ticketDef: TicketDef
let expectError = new TicketDefError()
let receivedError = new TicketDefError()

beforeEach(() => {
	ticketDef = new TicketDef()
	expectError = new TicketDefError()
	receivedError = new TicketDefError()
})
describe('TaskDef.setName', () => {
	it('Đặt tên cho định danh công việc', () => {
		ticketDef.setName('abc')

		expect(ticketDef.name).toEqual('abc')
	})

	it('Tên sẽ được Trim dấu cách', () => {
		ticketDef.setName(' hello      abc   xxx    ')

		expect(ticketDef.name).toEqual('hello abc xxx')
	})
	it('Báo lỗi nếu tên công việc có ký tự đặc biệt', () => {
		expectError.addError({
			property: 'name',
			code: 'SPECIALCHARS',
		})
		try {
			ticketDef.setName('Abc @#$@$')
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})

describe('TaskDef.setCode', () => {
	it('Set code viết hoa toàn bộ định danh công việc ', () => {
		ticketDef.setCode('abc')

		expect(ticketDef.code).toEqual('ABC')
	})
	it('Code được xóa khoảng trắng trước sau.', () => {
		ticketDef.setCode('         abc             ')

		expect(ticketDef.code).toEqual('ABC')
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
			ticketDef.setCode('Abc @#$@$')
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})
describe('TicketDef.createField', () => {
	it('Thêm một field cho TaskDef.form', () => {
		const { mockFiledScalarNumber } = mock()
		const newField = ticketDef.createField(mockFiledScalarNumber)
		expect(ticketDef.getField(newField.id)).toEqual(newField)
	})

	it('Báo lỗi nếu field truyền vào đã tồn tại trong danh sách', () => {
		const { mockFiledScalarNumber } = mock()
		const newField = ticketDef.createField(mockFiledScalarNumber)
		expectError.addError({
			property: 'field',
			code: 'ISEXIST',
			detailInfo: newField,
		})
		try {
			ticketDef.createField(newField)
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
	it('Nếu field có code đã tồn tại trong danh sách thì báo lỗi', () => {
		const { mockFiledScalarNumber, mockFiledScalarStringCodeDuplicate } = mock()
		ticketDef.createField(mockFiledScalarNumber)
		expectError.addError({
			property: 'field',
			code: 'CODE_ISEXIST',
			detailInfo: mockFiledScalarStringCodeDuplicate,
		})
		try {
			ticketDef.createField(mockFiledScalarStringCodeDuplicate)
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})
describe('TicketDef.createWorkFlowDef', () => {
	const ticketDef = TicketDef.builder()

	const { mockTaskDefSendMail } = mock()
	const { mockTaskDefInterview } = mock1()
	const workflowDef = new WorkflowDef()
	const one = workflowDef.createTask(mockTaskDefSendMail)
	const two = workflowDef.createTask(mockTaskDefInterview)
	const three = workflowDef.createTask(mockTaskDefInterview)

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
	workflowDef.createInputMapping({
		source: {
			task: one,
			field: one.taskDef.form[0],
		},
		target: {
			task: three,
			field: three.taskDef.form[0],
		},
	})

	it('Thêm workflowDef ', () => {
		const newWorkFlowDef = ticketDef.createWorkFlowDef(workflowDef)
		expect(ticketDef.workflow).toEqual(workflowDef)
	})
	it('Báo lỗi nếu workflowDef đã tồn tại', () => {
		expectError.addError({
			property: 'workflow',
			code: 'ISEXIST',
			detailInfo: workflowDef,
		})
		try {
			ticketDef.createWorkFlowDef(workflowDef)
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})
describe('TaskDef.getField', () => {
	it('Lấy field theo id', () => {
		const { mockFiledScalarNumber } = mock()
		const newField = ticketDef.createField(mockFiledScalarNumber)

		expect(ticketDef.getField(newField.id)).toEqual(newField)
	})

	it('Báo lỗi nếu field không tồn tại', () => {
		expectError.addError({
			property: 'field',
			code: 'NOTFOUND',
			detailInfo: '123',
		})
		try {
			ticketDef.getField('123')
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})

describe('ticketDef.getForm', () => {
	it('Lấy tất cả fields trong Ticket.form', () => {
		const { mockFiledScalarNumber, mockFiledScalarString } = mock()
		const newField1 = ticketDef.createField(mockFiledScalarNumber)
		const newField2 = ticketDef.createField(mockFiledScalarString)

		expect(ticketDef.form).toEqual([newField1, newField2])
	})
})

describe('TicketDef.deleteField', () => {
	it('Delete 1 field ra khỏi danh sách field', () => {
		const { mockFiledScalarNumber } = mock()
		const newField = ticketDef.createField(mockFiledScalarNumber)
		ticketDef.deleteField(newField.id)

		expect(ticketDef.form).toEqual([])
	})

	it('Báo lỗi nếu field không tồn tại', () => {
		expectError.addError({
			property: 'field',
			code: 'NOTFOUND',
			detailInfo: 'USER',
		})
		try {
			ticketDef.deleteField('USER')
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})

describe('TicketDef.updateField', () => {
	it('chỉnh sửa một field trong danh sách field', () => {
		const { mockFiledScalarNumber } = mock()
		const newField = ticketDef.createField(mockFiledScalarNumber)
		const updatedField = FieldDef.builder()
		updatedField.setId(newField.id)
		updatedField.setName(newField.name)
		updatedField.setCode(newField.code + 'AB')
		updatedField.setType(newField.type)
		ticketDef.updateField(newField.id, newField)

		expect(ticketDef.getField(newField.id)).toEqual(newField)
	})

	it('Báo lỗi nếu field không tồn tại trong danh sách field', () => {
		const { mockFiledScalarNumber } = mock()
		const newField = ticketDef.createField(mockFiledScalarNumber)
		const updatedField = FieldDef.builder()
		updatedField.setId(newField.id)
		updatedField.setName('xyz')
		updatedField.setCode(newField.code + 'AB')
		updatedField.setType(newField.type)
		expectError.addError({
			property: 'field',
			code: 'NOTFOUND',
			detailInfo: newField.id + '1',
		})
		try {
			ticketDef.updateField(newField.id + '1', updatedField)
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
	it('Báo lỗi code của field được chỉnh sửa đã tồn tại danh sách', () => {
		const { mockFiledScalarNumber, mockFiledScalarString } = mock()
		const newField1 = ticketDef.createField(mockFiledScalarNumber)
		const newField2 = ticketDef.createField(mockFiledScalarString)
		const updatedField = FieldDef.builder()
		updatedField.setId(newField1.id)
		updatedField.setName('xyz')
		updatedField.setCode(newField2.code)
		updatedField.setType(newField1.type)
		expectError.addError({
			property: 'field',
			code: 'CODE_ISEXIST',
			detailInfo: updatedField.id,
		})
		try {
			ticketDef.updateField(newField1.id, updatedField)
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})

describe('Ticket.build', () => {
	it('Nếu code chưa có giá trị', () => {
		const { mockFiledScalarNumber } = mock()
		ticketDef.setName('abc')
		ticketDef.createField(mockFiledScalarNumber)
		const { mockTaskDefSendMail } = mock()
		const { mockTaskDefInterview } = mock1()
		const workflowDef = new WorkflowDef()
		const one = workflowDef.createTask(mockTaskDefSendMail)
		const two = workflowDef.createTask(mockTaskDefInterview)
		const three = workflowDef.createTask(mockTaskDefInterview)

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
		workflowDef.createInputMapping({
			source: {
				task: one,
				field: one.taskDef.form[0],
			},
			target: {
				task: three,
				field: three.taskDef.form[0],
			},
		})
		ticketDef.createWorkFlowDef(workflowDef)
		expectError.addError({
			property: 'code',
			code: 'ISEMPTY',
		})
		try {
			ticketDef.build()
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
	it('Nếu name chưa có giá trị', () => {
		const { mockFiledScalarNumber } = mock()
		const { mockTaskDefSendMail } = mock()
		const { mockTaskDefInterview } = mock1()
		const workflowDef = new WorkflowDef()
		const one = workflowDef.createTask(mockTaskDefSendMail)
		const two = workflowDef.createTask(mockTaskDefInterview)
		const three = workflowDef.createTask(mockTaskDefInterview)

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
		workflowDef.createInputMapping({
			source: {
				task: one,
				field: one.taskDef.form[0],
			},
			target: {
				task: three,
				field: three.taskDef.form[0],
			},
		})
		ticketDef.createWorkFlowDef(workflowDef)
		ticketDef.setCode('ABC')
		ticketDef.createField(mockFiledScalarNumber)
		expectError.addError({
			property: 'name',
			code: 'ISEMPTY',
		})
		try {
			ticketDef.build()
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
	it('Nếu form chưa có giá trị', () => {
		const { mockTaskDefSendMail } = mock()
		const { mockTaskDefInterview } = mock1()
		const workflowDef = new WorkflowDef()
		const one = workflowDef.createTask(mockTaskDefSendMail)
		const two = workflowDef.createTask(mockTaskDefInterview)
		const three = workflowDef.createTask(mockTaskDefInterview)

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
		workflowDef.createInputMapping({
			source: {
				task: one,
				field: one.taskDef.form[0],
			},
			target: {
				task: three,
				field: three.taskDef.form[0],
			},
		})
		ticketDef.createWorkFlowDef(workflowDef)
		ticketDef.setCode('ABC')
		ticketDef.setName('abc')
		expectError.addError({
			property: 'form',
			code: 'ISEMPTY',
		})
		try {
			ticketDef.build()
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
	it('Báo lỗi nếu tất cả các trường chưa có giá trị', () => {
		const { mockTaskDefSendMail } = mock()
		const { mockTaskDefInterview } = mock1()
		const workflowDef = new WorkflowDef()
		const one = workflowDef.createTask(mockTaskDefSendMail)
		const two = workflowDef.createTask(mockTaskDefInterview)
		const three = workflowDef.createTask(mockTaskDefInterview)

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
		workflowDef.createInputMapping({
			source: {
				task: one,
				field: one.taskDef.form[0],
			},
			target: {
				task: three,
				field: three.taskDef.form[0],
			},
		})
		ticketDef.createWorkFlowDef(workflowDef)
		expectError.addError({
			property: 'code',
			code: 'ISEMPTY',
		})
		expectError.addError({
			property: 'name',
			code: 'ISEMPTY',
		})
		expectError.addError({
			property: 'form',
			code: 'ISEMPTY',
		})
		try {
			ticketDef.build()
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})
