import { AgentGroupError } from './../src/models/exceptions/agentgroup.error'
import { Employee, AgentGroup } from '@src/models/AgentGroup.model'

const mock = (): Employee[] => {
	return [
		{ email: 'andeatran@gmail.com', name: 'Tran Diep Phuong Vy' },
		{ email: 'beo1692@gmail.com', name: 'Pham Nhat Tien' },
		{ email: 'tienpn@inter-k.com', name: 'Pham Tien' },
	]
}

let agentGroup: AgentGroup
let expectError = new AgentGroupError()
let receivedError = new AgentGroupError()

beforeEach(() => {
	agentGroup = new AgentGroup()
	expectError = new AgentGroupError()
	receivedError = new AgentGroupError()
})

describe('agentGroup.setName', () => {
	it('Đặt tên cho agentGroup', () => {
		agentGroup.setName('User')
		expect(agentGroup.name).toEqual('User')
	})
	it('Tên sẽ được loại bỏ dấu cách ở trước và sau trước khi được đặt cho tên', () => {
		agentGroup.setName(' Phone   Brand    ')
		expect(agentGroup.name).toEqual('Phone Brand')
	})
	it('Nếu tên agentGroup có kí tự đặt biệt thì báo lỗi', () => {
		expectError.addError({
			property: 'name',
			code: 'SPECIALCHARS',
		})
		try {
			agentGroup.setName('Abc @#$@$')
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})

describe('agentGroup.setCode', () => {
	it('Set code cho agentGroup', () => {
		agentGroup.setCode('ABC')
		expect(agentGroup.code).toEqual('ABC')
	})
	it('Code được viết hoa, dấu cách được trim thay thế bằng dấu _', () => {
		agentGroup.setCode('  Phone brand   ')
		expect(agentGroup.code).toEqual('PHONE_BRAND')
	})
	it('Code có chứa ký tự đặt biệt sẽ báo lỗi', () => {
		expectError.addError({
			property: 'code',
			code: 'SPECIALCHARS',
		})
		try {
			agentGroup.setCode('Abc @#$@$')
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})

describe('AgentGroup.addMember', () => {
	it('Thêm thành viên vào Agentgroup', () => {
		const mockData = mock()
		agentGroup.addMember(mockData[0])
		expect(agentGroup.members).toEqual(expect.arrayContaining([mockData[0]]))
	})
	it('Báo lỗi nếu nhân viên đã tồn tại', () => {
		const mockData = mock()
		agentGroup.addMember(mockData[0])
		expectError.addError({
			property: 'members',
			code: 'ISEXIST',
			detailInfo: mockData[0],
		})
		try {
			agentGroup.addMember(mockData[0])
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})

describe('AgentGroup.getMember', () => {
	it('Lấy thành viên từ danh sách', () => {
		const mockData = mock()
		agentGroup.addMember(mockData[0])
		expect(agentGroup.getMember(mockData[0].email)).toEqual(mockData[0])
	})
	it('Báo lỗi nếu thành viên không tồn tại', () => {
		const mockData = mock()
		agentGroup.addMember(mockData[0])
		expectError.addError({
			property: 'members',
			code: 'NOTFOUND',
			detailInfo: mockData[1].email,
		})
		try {
			agentGroup.getMember(mockData[1].email)
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})

describe('AgentGroup.deleteMember', () => {
	it('Xóa nhân viên trong Agentgroup', () => {
		const mockData = mock()
		agentGroup.addMember(mockData[0])
		agentGroup.addMember(mockData[1])
		agentGroup.deleteMember(mockData[1].email)
		expect(agentGroup.members).toEqual([mockData[0]])
	})
	it('Báo lỗi nếu nhân viên bị xóa là leader', () => {
		const mockData = mock()
		agentGroup.addMember(mockData[0])
		agentGroup.addMember(mockData[1])
		agentGroup.setLeader(mockData[1])
		expectError.addError({ property: 'members', code: 'ISLEADER' })
		try {
			agentGroup.deleteMember(mockData[1].email)
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
	it('Báo lỗi nếu member không tồn tại trong danh sách', () => {
		const mockData = mock()
		agentGroup.addMember(mockData[0])
		expectError.addError({
			property: 'members',
			code: 'NOTFOUND',
			detailInfo: mockData[1].email,
		})
		try {
			agentGroup.deleteMember(mockData[1].email)
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})
describe('AgentGroup.setLeader', () => {
	it('Gán Leader', () => {
		const mockData = mock()
		agentGroup.addMember(mockData[0])
		agentGroup.addMember(mockData[1])
		agentGroup.setLeader(mockData[1])
		expect(agentGroup.leader).toEqual(mockData[1])
	})
	it('Nếu Leader chưa có trong member thì báo lỗi', () => {
		const mockData = mock()
		agentGroup.addMember(mockData[0])
		expectError.addError({
			property: 'leader',
			code: 'NOT_A_MEMBER',
			detailInfo: mockData[1],
		})
		try {
			agentGroup.setLeader(mockData[1])
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
	it('Báo lỗi nếu leader cũ được gán lại', () => {
		const mockData = mock()
		agentGroup.addMember(mockData[0])
		agentGroup.addMember(mockData[1])
		agentGroup.setLeader(mockData[1])
		expectError.addError({
			property: 'leader',
			code: 'ALREADY_LEADER',
			detailInfo: mockData[1],
		})
		try {
			agentGroup.setLeader(mockData[1])
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})
describe('AgentGroup.build', () => {
	it('Báo lỗi nếu trường name không có giá trị', () => {
		agentGroup.setCode('ABC')
		const mockData = mock()
		agentGroup.addMember(mockData[0])
		agentGroup.setLeader(mockData[0])
		expectError.addError({
			property: 'name',
			code: 'ISEMPTY',
		})
		try {
			agentGroup.build()
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
	it('Báo lỗi nếu trường code không có giá trị', () => {
		agentGroup.setName('Acb')
		const mockData = mock()
		agentGroup.addMember(mockData[0])
		agentGroup.setLeader(mockData[0])
		expectError.addError({
			property: 'code',
			code: 'ISEMPTY',
		})
		try {
			agentGroup.build()
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
	it('Báo lỗi nếu trường members và leader không có giá trị', () => {
		agentGroup.setName('Acb')
		agentGroup.setCode('ABC')
		expectError.addError({
			property: 'members',
			code: 'ISEMPTY',
		})
		expectError.addError({
			property: 'leader',
			code: 'ISEMPTY',
		})
		try {
			agentGroup.build()
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
	it('Báo lỗi nếu trường leader không có giá trị', () => {
		agentGroup.setName('Acb')
		agentGroup.setCode('ABC')
		expectError.addError({
			property: 'leader',
			code: 'ISEMPTY',
		})
		try {
			agentGroup.build()
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
	it('Báo lỗi nếu trường name, code, member, leader không có giá trị', () => {
		expectError.addError({
			property: 'name',
			code: 'ISEMPTY',
		})
		expectError.addError({
			property: 'code',
			code: 'ISEMPTY',
		})
		expectError.addError({
			property: 'members',
			code: 'ISEMPTY',
		})
		expectError.addError({
			property: 'leader',
			code: 'ISEMPTY',
		})
		try {
			agentGroup.build()
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})
