import { FieldDef } from '@src/models'
import { FieldDefError } from '@src/models/exceptions/fielddef.error'

let fieldDef = FieldDef.builder()
let expectError = new FieldDefError()
let receivedError = new FieldDefError()

beforeEach(() => {
	fieldDef = FieldDef.builder()
	expectError = new FieldDefError()
	receivedError = new FieldDefError()
})

describe('FieldDef.setName', () => {
	it('Đặt tên cho FieldDef', () => {
		fieldDef.setName('Abc')
		expect(fieldDef.name).toEqual('Abc')
	})
	it('Tên sẽ được loại bỏ dấu cách ở trước và sau trước khi được đặt cho tên', () => {
		fieldDef.setName(' Abc  abc  ')
		expect(fieldDef.name).toEqual('Abc abc')
	})
	it('Nếu tên FieldDef có kí tự đặt biệt thì báo lỗi', () => {
		expectError.addError({
			property: 'name',
			code: 'SPECIALCHARS',
		})
		expect(() => fieldDef.setName('Abc @#$@$')).toThrow(expectError)
	})
})

describe('FieldDef.setCode', () => {
	it('Set code cho FieldDef', () => {
		fieldDef.setCode('ABC')
		expect(fieldDef.code).toEqual('ABC')
	})
	it('Code được viết hoa, dấu cách được trim thay thế bằng dấu _', () => {
		fieldDef.setCode('abc')
		expect(fieldDef.code).toEqual('ABC')
	})
	it('Code có chứa ký tự đặt biệt sẽ báo lỗi', () => {
		expectError.addError({
			property: 'code',
			code: 'SPECIALCHARS',
		})
		expect(() => fieldDef.setCode('Abc @#$@$')).toThrow(expectError)
	})
})

describe('FieldDef.build', () => {
	it('Báo lỗi nếu tên chưa có giá trị', () => {
		fieldDef.setCode('ABC')
		fieldDef.setType({
			type: 'SCALAR',
			target: 'string',
		})
		expectError.addError({
			property: 'name',
			code: 'ISEMPTY',
		})
		try {
			fieldDef.build()
		} catch (error) {
			receivedError = error as FieldDefError
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
	it('Báo lỗi nếu code chưa có giá trị', () => {
		fieldDef.setName('Abc')
		fieldDef.setType({
			type: 'SCALAR',
			target: 'string',
		})
		expectError.addError({
			property: 'code',
			code: 'ISEMPTY',
		})
		try {
			fieldDef.build()
		} catch (error) {
			receivedError = error as FieldDefError
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
	it('Báo lỗi nếu code chưa có giá trị', () => {
		fieldDef.setName('Abc')
		fieldDef.setCode('ABC')
		expectError.addError({
			property: 'type',
			code: 'ISEMPTY',
		})
		try {
			fieldDef.build()
		} catch (error) {
			receivedError = error as FieldDefError
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
	it('Báo lỗi nếu name, code, type chưa có giá tị', () => {
		expectError.addError({
			property: 'name',
			code: 'ISEMPTY',
		})
		expectError.addError({
			property: 'code',
			code: 'ISEMPTY',
		})
		expectError.addError({
			property: 'type',
			code: 'ISEMPTY',
		})
		try {
			fieldDef.build()
		} catch (error) {
			receivedError = error as FieldDefError
		}
		expect(receivedError.list).toEqual(
			expect.arrayContaining([
				{
					property: 'type',
					code: 'ISEMPTY',
				},
				{
					property: 'code',
					code: 'ISEMPTY',
				},
				{
					property: 'name',
					code: 'ISEMPTY',
				},
			]),
		)
	})
})
