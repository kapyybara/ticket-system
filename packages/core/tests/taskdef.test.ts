import { FieldDef, TaskDef, AgentGroup } from '@src/models'
import { Employee } from '@src/models/AgentGroup.model'
import { TaskDefError } from '@src/models/exceptions/taskdef.error'

import { TaskOutCome } from '@src/models/type'

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

	return {
		mockOutCome,
		mockFiledScalarNumber,
		mockFiledScalarStringCodeDuplicate,
		mockFiledScalarString,
		mockAgent,
	}
}

let taskDef: TaskDef
let expectError = new TaskDefError()
let receivedError = new TaskDefError()

beforeEach(() => {
	taskDef = new TaskDef()
	expectError = new TaskDefError()
	receivedError = new TaskDefError()
})

describe('TaskDef.setName', () => {
	it('Đặt tên cho định danh công việc', () => {
		taskDef.setName('abc')

		expect(taskDef.name).toEqual('abc')
	})

	it('Tên sẽ được Trim dấu cách', () => {
		taskDef.setName(' hello      abc   xxx    ')

		expect(taskDef.name).toEqual('hello abc xxx')
	})
	it('Báo lỗi nếu tên công việc có ký tự đặc biệt', () => {
		expectError.addError({
			property: 'name',
			code: 'SPECIALCHARS',
		})
		try {
			taskDef.setName('Abc @#$@$')
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})

describe('TaskDef.setCode', () => {
	it('Set code viết hoa toàn bộ định danh công việc ', () => {
		taskDef.setCode('abc')

		expect(taskDef.code).toEqual('ABC')
	})
	it('Code được xóa khoảng trắng trước sau.', () => {
		taskDef.setCode('         abc             ')

		expect(taskDef.code).toEqual('ABC')
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
			taskDef.setCode('Abc @#$@$')
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})

describe('TaskDef.getField', () => {
	it('Lấy field theo id', () => {
		const { mockFiledScalarNumber } = mock()
		const newField = taskDef.createField(mockFiledScalarNumber)

		expect(taskDef.getField(newField.id)).toEqual(newField)
	})

	it('Báo lỗi nếu field không tồn tại', () => {
		expectError.addError({
			property: 'field',
			code: 'NOTFOUND',
			detailInfo: '123',
		})
		try {
			taskDef.getField('123')
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})

describe('TaskDef.createField', () => {
	it('Thêm một field cho TaskDef.form', () => {
		const { mockFiledScalarNumber } = mock()
		const newField = taskDef.createField(mockFiledScalarNumber)
		expect(taskDef.getField(newField.id)).toEqual(newField)
	})

	it('Báo lỗi nếu field truyền vào đã tồn tại trong danh sách', () => {
		const { mockFiledScalarNumber } = mock()
		const newField = taskDef.createField(mockFiledScalarNumber)
		expectError.addError({
			property: 'field',
			code: 'ISEXIST',
			detailInfo: newField,
		})
		try {
			taskDef.createField(newField)
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
	it('Nếu field có code đã tồn tại trong danh sách thì báo lỗi', () => {
		const { mockFiledScalarNumber, mockFiledScalarStringCodeDuplicate } = mock()
		taskDef.createField(mockFiledScalarNumber)
		expectError.addError({
			property: 'field',
			code: 'CODE_ISEXIST',
			detailInfo: mockFiledScalarStringCodeDuplicate.id,
		})
		try {
			taskDef.createField(mockFiledScalarStringCodeDuplicate)
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})

describe('TaskDef.deleteField', () => {
	it('Delete 1 field ra khỏi danh sách field', () => {
		const { mockFiledScalarNumber } = mock()
		const newField = taskDef.createField(mockFiledScalarNumber)
		taskDef.deleteField(newField.id)

		expect(taskDef.form).toEqual([])
	})

	it('Báo lỗi nếu field không tồn tại', () => {
		expectError.addError({
			property: 'field',
			code: 'NOTFOUND',
			detailInfo: 'USER',
		})
		try {
			taskDef.deleteField('USER')
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})

describe('TaskDef.updateField', () => {
	it('chỉnh sửa một field trong danh sách field', () => {
		const { mockFiledScalarNumber } = mock()
		const newField = taskDef.createField(mockFiledScalarNumber)
		const updatedField = FieldDef.builder()
		updatedField.setId(newField.id)
		updatedField.setName(newField.name)
		updatedField.setCode(newField.code + 'AB')
		updatedField.setType(newField.type)
		taskDef.updateField(newField.id, newField)

		expect(taskDef.getField(newField.id)).toEqual(newField)
	})

	it('Báo lỗi nếu field không tồn tại trong danh sách field', () => {
		const { mockFiledScalarNumber } = mock()
		const newField = taskDef.createField(mockFiledScalarNumber)
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
			taskDef.updateField(newField.id + '1', updatedField)
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
	it('Báo lỗi code của field được chỉnh sửa đã tồn tại danh sách', () => {
		const { mockFiledScalarNumber, mockFiledScalarString } = mock()
		const newField1 = taskDef.createField(mockFiledScalarNumber)
		const newField2 = taskDef.createField(mockFiledScalarString)
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
			taskDef.updateField(newField1.id, updatedField)
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})

describe('TaskDef.getForm', () => {
	it('Lấy tất cả field trong TaskDef.form', () => {
		const { mockFiledScalarNumber, mockFiledScalarString } = mock()
		const Field1 = taskDef.createField(mockFiledScalarNumber)
		const Field2 = taskDef.createField(mockFiledScalarString)

		expect(taskDef.form).toEqual([Field1, Field2])
	})
})

describe('TaskDef.createOutCome', () => {
	it('Create 1 outcome vào TaskDef', () => {
		const { mockOutCome } = mock()
		const newOutCome = taskDef.createOutCome(mockOutCome[0])

		expect(taskDef.getOutCome(newOutCome.id)).toEqual(newOutCome)
	})

	it('Báo lỗi nếu SubOutCome rỗng', () => {
		const { mockOutCome } = mock()
		mockOutCome[0].subOutCome = ''
		const emptySubOutCome = mockOutCome[0]
		expectError.addError({
			property: 'outcome',
			code: 'NOTFOUND',
			detailInfo: emptySubOutCome.subOutCome,
		})
		try {
			taskDef.createOutCome(emptySubOutCome)
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})

	it('Báo lỗi nếu outCome giống nhau có cùng SubOutCome', () => {
		const { mockOutCome } = mock()
		mockOutCome[1].outcome = 'DONE'
		mockOutCome[1].subOutCome = 'Gửi thành công'
		const duplicateTaskOutComeError = mockOutCome[1]
		taskDef.createOutCome(mockOutCome[0])
		expectError.addError({
			property: 'outcome',
			code: 'ISEXIST',
			detailInfo: duplicateTaskOutComeError,
		})
		try {
			taskDef.createOutCome(duplicateTaskOutComeError)
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})

describe('TaskDef.getOutCome', () => {
	it('Lấy task outcome theo id', () => {
		const { mockOutCome } = mock()
		const newoutCome = taskDef.createOutCome(mockOutCome[0])

		expect(taskDef.getOutCome(newoutCome.id)).toEqual(newoutCome)
	})
	it('Báo lỗi nếu TaskOutCome không tồn tại', () => {
		const { mockOutCome } = mock()
		taskDef.createOutCome(mockOutCome[0])
		expectError.addError({
			property: 'outcome',
			code: 'NOTFOUND',
			detailInfo: 'notfoundId',
		})
		try {
			taskDef.getOutCome('notfoundId')
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})

describe('TaskDef.deleteOutCome', () => {
	it('xóa outcome trong danh sách outcome đưa theo id được truyền vào', () => {
		const { mockOutCome } = mock()
		const newOutCome = taskDef.createOutCome(mockOutCome[0])
		taskDef.deleteOutCome(newOutCome.id)
		expect(taskDef.outcome).toEqual([])
	})
	it('Báo lỗi nếu outcome không tồn tại', () => {
		const { mockOutCome } = mock()
		taskDef.createOutCome(mockOutCome[0])
		expectError.addError({
			property: 'outcome',
			code: 'NOTFOUND',
			detailInfo: 'notfoundId',
		})
		try {
			taskDef.deleteOutCome('notfoundId')
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})

describe('TaskDef.updateOutCome', () => {
	it('Thay đổi outcome', () => {
		const { mockOutCome } = mock()
		const newOutCome = taskDef.createOutCome(mockOutCome[0])
		newOutCome.outcome = 'FAIL'
		const changeOutcome = taskDef.updateOutCome(newOutCome.id, newOutCome)
		expect(taskDef.getOutCome(newOutCome.id)).toEqual(changeOutcome)
	})
	it('Báo lỗi nếu id outcome không tồn tại', () => {
		const { mockOutCome } = mock()
		const newOutCome = taskDef.createOutCome(mockOutCome[0])
		newOutCome.outcome = 'FAIL'
		expectError.addError({
			property: 'outcome',
			code: 'NOTFOUND',
			detailInfo: 'notfoundId',
		})
		try {
			taskDef.updateOutCome('notfoundId', newOutCome)
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
	it('Báo lỗi nếu sửa suboutcome có cùng outcome đã tồn tại', () => {
		const { mockOutCome } = mock()
		taskDef.createOutCome(mockOutCome[0])
		const newOutCome = taskDef.createOutCome(mockOutCome[1])
		newOutCome.outcome = mockOutCome[0].outcome
		newOutCome.subOutCome = mockOutCome[0].subOutCome
		expectError.addError({
			property: 'outcome',
			code: 'ISEXIST',
			detailInfo: mockOutCome[1],
		})
		try {
			taskDef.updateOutCome(newOutCome.id, newOutCome)
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})

describe('TaskDef.getOutCome', () => {
	it('Lấy tất cả outcome trong TaskDef.outcome', () => {
		const { mockOutCome } = mock()
		const OutCome1 = taskDef.createOutCome(mockOutCome[0])
		const OutCome2 = taskDef.createOutCome(mockOutCome[1])

		expect(taskDef.outcome).toEqual([OutCome1, OutCome2])
	})
})

describe('TaskDef.setAgentGroup', () => {
	it('Set AgentGroup Cho TaskDef', () => {
		const { mockAgent } = mock()
		const newAgentGroup = taskDef.setAgentGroup(mockAgent)

		expect(taskDef.getAgentGroup(newAgentGroup.id)).toEqual(newAgentGroup)
	})

	it('Báo lỗi nếu AgenGroup đã tồn tại', () => {
		const { mockAgent } = mock()
		taskDef.setAgentGroup(mockAgent)

		expectError.addError({
			property: 'agentgroup',
			code: 'NOTFOUND',
			detailInfo: mockAgent,
		})
		try {
			taskDef.setAgentGroup(mockAgent)
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})

describe('TaskDef.getAgentGroup', () => {
	it('get AgentGroup', () => {
		const { mockAgent } = mock()
		const newAgentGroup = taskDef.setAgentGroup(mockAgent)

		expect(taskDef.getAgentGroup(newAgentGroup.id)).toEqual(newAgentGroup)
	})

	it('Báo lỗi nếu AgenGroup không tồn tại', () => {
		const { mockAgent } = mock()
		taskDef.setAgentGroup(mockAgent)

		expectError.addError({
			property: 'agentgroup',
			code: 'NOTFOUND',
			detailInfo: 'IdNotFound',
		})
		try {
			taskDef.getAgentGroup('IdNotFound')
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})

describe('TaskDef.getAgentGroup', () => {
	it('Lấy tất cả agentGroup trong TaskDef.agentGroup', () => {
		const { mockAgent } = mock()
		const AgentGroup = taskDef.setAgentGroup(mockAgent)

		expect(taskDef.agentGroup).toEqual(AgentGroup)
	})
})

describe('TaskDef.build', () => {
	it('Nếu code chưa có giá trị', () => {
		const { mockFiledScalarNumber, mockOutCome, mockAgent } = mock()
		taskDef.setName('abc')
		taskDef.createField(mockFiledScalarNumber)
		taskDef.createOutCome(mockOutCome[0])
		taskDef.setAgentGroup(mockAgent)
		expectError.addError({
			property: 'code',
			code: 'ISEMPTY',
		})
		try {
			taskDef.build()
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
	it('Nếu name chưa có giá trị', () => {
		const { mockFiledScalarNumber, mockOutCome, mockAgent } = mock()
		taskDef.setCode('ABC')
		taskDef.createField(mockFiledScalarNumber)
		taskDef.createOutCome(mockOutCome[0])
		taskDef.setAgentGroup(mockAgent)
		expectError.addError({
			property: 'name',
			code: 'ISEMPTY',
		})
		try {
			taskDef.build()
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
	it('Nếu form chưa có giá trị', () => {
		const { mockOutCome, mockAgent } = mock()
		taskDef.setCode('ABC')
		taskDef.setName('abc')
		taskDef.createOutCome(mockOutCome[0])
		taskDef.setAgentGroup(mockAgent)
		expectError.addError({
			property: 'form',
			code: 'ISEMPTY',
		})
		try {
			taskDef.build()
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})

	it('Nếu outcome chưa có giá trị', () => {
		const { mockFiledScalarNumber, mockAgent } = mock()
		taskDef.setCode('ABC')
		taskDef.setName('abc')
		taskDef.createField(mockFiledScalarNumber)
		taskDef.setAgentGroup(mockAgent)
		expectError.addError({
			property: 'outcome',
			code: 'ISEMPTY',
		})
		try {
			taskDef.build()
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
	it('Nếu agentGroup chưa có giá trị', () => {
		const { mockFiledScalarNumber, mockOutCome } = mock()
		taskDef.setCode('ABC')
		taskDef.setName('abc')
		taskDef.createField(mockFiledScalarNumber)
		taskDef.createOutCome(mockOutCome[0])
		expectError.addError({
			property: 'agentGroup',
			code: 'ISEMPTY',
		})
		try {
			taskDef.build()
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
	it('Báo lỗi nếu tất cả các trường chưa có giá trị', () => {
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
		expectError.addError({
			property: 'outcome',
			code: 'ISEMPTY',
		})
		expectError.addError({
			property: 'agentGroup',
			code: 'ISEMPTY',
		})
		try {
			taskDef.build()
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})
