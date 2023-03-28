import { FieldDef, MasterDataDef } from '@src/models'
import { MasterDataDefError } from '@src/models/exceptions/masterdef.error'

const field1 = FieldDef.builder()
field1.setName('user')
field1.setCode('USER')
field1.setType({
	type: 'SCALAR',
	target: 'string',
})
const field1_1 = FieldDef.builder()
field1_1.setName('user')
field1_1.setCode('USER')
field1_1.setType({
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

let masterDataDef = MasterDataDef.builder()
let expectError = new MasterDataDefError()
let receivedError = new MasterDataDefError()
beforeEach(() => {
	masterDataDef = MasterDataDef.builder()
	expectError = new MasterDataDefError()
	receivedError = new MasterDataDefError()
})

describe('MasterDataDef.setName', () => {
	it('Đặt tên cho MasterDataDef', () => {
		masterDataDef.setName('User')
		expect(masterDataDef.name).toEqual('User')
	})
	it('Tên sẽ được loại bỏ dấu cách ở trước và sau trước khi được đặt cho tên', () => {
		masterDataDef.setName(' Phone   Brand    ')
		expect(masterDataDef.name).toEqual('Phone Brand')
	})
	it('Nếu tên MasterDataDef có kí tự đặt biệt thì báo lỗi', () => {
		expectError.addError({
			property: 'name',
			code: 'SPECIALCHARS',
		})
		try {
			masterDataDef.setName('Abc @#$@$')
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})

describe('MasterDataDef.setCode', () => {
	it('Set code cho MasterDataDef', () => {
		const masterDataDef = MasterDataDef.builder()
		masterDataDef.setCode('ABC')
		expect(masterDataDef.code).toEqual('ABC')
	})
	it('Code được viết hoa, dấu cách được trim thay thế bằng dấu _', () => {
		masterDataDef.setCode('  Phone brand   ')
		expect(masterDataDef.code).toEqual('PHONE_BRAND')
	})
	it('Code có chứa ký tự đặt biệt sẽ báo lỗi', () => {
		expectError.addError({
			property: 'code',
			code: 'SPECIALCHARS',
		})
		try {
			masterDataDef.setCode('Abc @#$@$')
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})

describe('MasterDataDef.addDisplayField', () => {
	it('Thêm Field hiển thị cho DataElementDefniition', () => {
		const newField1 = masterDataDef.createField(field1)
		masterDataDef.addDisplayField(newField1.code)
		expect(masterDataDef.displayField[0]).toEqual(newField1.code)
	})
	it('Field không tồn tại trong form thì báo lỗi', () => {
		expectError.addError({
			property: 'field',
			code: 'NOTFOUND',
			detailInfo: 'abac',
		})
		try {
			masterDataDef.addDisplayField('abac')
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
	it('Field đã tồn tại thì báo lỗi', () => {
		const newField1 = masterDataDef.createField(field1)
		masterDataDef.addDisplayField(newField1.code)
		expectError.addError({
			property: 'displayField',
			code: 'ISEXIST',
			detailInfo: newField1.code,
		})
		try {
			masterDataDef.addDisplayField(newField1.code)
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})

describe('MasterDataDef.deleteDisplayField', () => {
	it('Xóa displayField cho MasterDataDef', () => {
		const newField1 = masterDataDef.createField(field1)
		masterDataDef.addDisplayField(newField1.code)
		masterDataDef.deleteDisplayField(newField1.code)
		expect(masterDataDef.displayField).toEqual([])
	})
	it('Nếu displayField không tồn tại báo lỗi', () => {
		const newField1 = masterDataDef.createField(field1)
		masterDataDef.addDisplayField(newField1.code)
		expectError.addError({
			property: 'displayField',
			code: 'NOTFOUND',
			detailInfo: 'abc',
		})
		try {
			masterDataDef.deleteDisplayField('abc')
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})

describe('MasterDataDef.createField', () => {
	it('Thêm một field cho MasterData.form', () => {
		masterDataDef.setName('abc')
		const newField = masterDataDef.createField(field1)
		expect(masterDataDef.getField(newField.id)).toEqual(newField)
	})

	it('Nếu field đã tồn tại trong danh sách thì báo lỗi', () => {
		const newField = masterDataDef.createField(field1)
		expectError.addError({
			property: 'field',
			code: 'ISEXIST',
			detailInfo: newField,
		})
		try {
			masterDataDef.createField(newField)
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})

	it('Nếu field có code đã tồn tại trong danh sách thì báo lỗi', () => {
		masterDataDef.createField(field1)
		expectError.addError({
			property: 'field',
			code: 'CODE_ISEXIST',
			detailInfo: field1_1.id,
		})
		try {
			masterDataDef.createField(field1_1)
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})

describe('MasterDataDef.getField', () => {
	it('Lấy field có id trùng với id được truyền vào', () => {
		const masterDataDef = MasterDataDef.builder()
		const newField = masterDataDef.createField(field1)
		expect(masterDataDef.getField(newField.id)).toEqual(newField)
	})

	it('Báo lỗi nếu field không tồn tại', () => {
		expectError.addError({
			property: 'field',
			code: 'NOTFOUND',
			detailInfo: '123',
		})
		try {
			masterDataDef.getField('123')
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})

describe('MasterDataDef.getAllField', () => {
	it('Lấy tất cả fields trong MasterDef.form', () => {
		const newField1 = masterDataDef.createField(field1)
		const newField2 = masterDataDef.createField(field2)
		expect(masterDataDef.form).toEqual([newField1, newField2])
	})
})

describe('MasterDataDef.deleteField', () => {
	it(' Xóa field ra khỏi MasterData', () => {
		const newField = masterDataDef.createField(field1)
		masterDataDef.deleteField(newField.id)

		expect(masterDataDef.form).toEqual([])
	})

	it('Xóa field hiển thị tương ứng', () => {
		const newField = masterDataDef.createField(field1)
		masterDataDef.addDisplayField(newField.code)
		masterDataDef.deleteField(newField.id)

		expect(masterDataDef.displayField).toEqual([])
	})

	it('Nếu field không tồn tại thì báo lỗi', () => {
		expectError.addError({
			property: 'field',
			code: 'NOTFOUND',
			detailInfo: 'USER',
		})
		try {
			masterDataDef.deleteField('USER')
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})

describe('MasterDataDef.updateField', () => {
	it('Chỉnh sữa field của MasterData', () => {
		const newField = masterDataDef.createField(field1)
		const updatedField = FieldDef.builder()
		updatedField.setId(newField.id)
		updatedField.setName(newField.name)
		updatedField.setCode(newField.code + 'AB')
		updatedField.setType(newField.type)
		masterDataDef.updateField(newField.id, updatedField)
		expect(masterDataDef.getField(newField.id)).toEqual(updatedField)
	})
	it('Field sửa không tồn tại thì báo lỗi', () => {
		const newField = masterDataDef.createField(field1)
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
			masterDataDef.updateField(newField.id + '1', updatedField)
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})

	it('Nếu code của field đã tồn tại trong danh sách thì báo lỗi', () => {
		const newField1 = masterDataDef.createField(field1)
		const newField2 = masterDataDef.createField(field2)
		// const updatedField = FieldDef.builder()
		// updatedField.setId(newField1.id)
		// updatedField.setName('xyz')
		// updatedField.setCode(newField2.code)
		// updatedField.setType(newField1.type)
		expectError.addError({
			property: 'field',
			code: 'CODE_ISEXIST',
			detailInfo: newField1.id,
		})
		try {
			masterDataDef.updateField(newField1.id, { code: newField2.code })
		} catch (error) {
			console.log(error)
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})

	it('DisplayField tương ứng sẽ đưọc cập nhật', () => {
		const newField = masterDataDef.createField(field1)
		masterDataDef.addDisplayField(newField.code)
		const updatedField = FieldDef.builder()
		updatedField.setId(newField.id)
		updatedField.setName('xyz')
		updatedField.setCode(newField.code + '12')
		updatedField.setType(newField.type)
		masterDataDef.updateField(newField.id, updatedField)

		expect(masterDataDef.displayField).toEqual([updatedField.code])
	})
})
describe('MasterData.build', () => {
	it('Báo lỗi nếu trường code chưa có gía trị', () => {
		masterDataDef.setName('ABC')
		masterDataDef.createField(field1)
		expectError.addError({
			property: 'code',
			code: 'ISEMPTY',
		})
		try {
			masterDataDef.build()
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
	it('Báo lỗi nếu trường name chưa có giá trị', () => {
		masterDataDef.setCode('101')
		masterDataDef.createField(field1)
		expectError.addError({
			property: 'name',
			code: 'ISEMPTY',
		})
		try {
			masterDataDef.build()
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
	it('Báo lỗi nếu trường form rỗng', () => {
		masterDataDef.setCode('101')
		masterDataDef.setName('Mot Khong Mot')
		expectError.addError({
			property: 'form',
			code: 'ISEMPTY',
		})
		try {
			masterDataDef.build()
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
	it('Báo lỗi nếu trường name và name và form chưa có giá trị', () => {
		expectError.addError({
			property: 'name',
			code: 'ISEMPTY',
		})
		expectError.addError({
			property: 'code',
			code: 'ISEMPTY',
		})
		expectError.addError({
			property: 'form',
			code: 'ISEMPTY',
		})
		try {
			masterDataDef.build()
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})
