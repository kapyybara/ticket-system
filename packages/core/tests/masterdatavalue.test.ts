import { FieldDef, MasterDataDef } from '@src/models'
import { FieldValue } from '@src/models/FieldValue.model'
import { MasterDataValue } from '@src/models/MasterDataValue.model'
import { MasterDataValueError } from '@src/models/exceptions/masterdatavalue.error'
import { v4 as uuid } from 'uuid'

const mock = () => {
	//! string
	const stringFieldDef = FieldDef.builder()
	stringFieldDef.setName('User name')
	stringFieldDef.setCode('USER')
	stringFieldDef.setType({
		type: 'SCALAR',
		target: 'string',
	})
	//! number
	const numberFieldDef = FieldDef.builder()
	numberFieldDef.setName('Age')
	numberFieldDef.setCode('AGE')
	numberFieldDef.setType({
		type: 'SCALAR',
		target: 'number',
	})
	const userMs = MasterDataDef.builder()

	userMs.setName('User ms')
	userMs.setCode('USER')
	userMs.createField(stringFieldDef)
	userMs.createField(numberFieldDef)

	return {
		userMs,
		stringFieldDef,
		numberFieldDef,
	}
}

// SETUP
let masterDataValue = MasterDataValue.builder()
let expectError = new MasterDataValueError()
let receivedError = new MasterDataValueError()

beforeEach(() => {
	masterDataValue = MasterDataValue.builder()
	expectError = new MasterDataValueError()
	receivedError = new MasterDataValueError()
})

describe('MasterDataValue.createFormValue', () => {
	it('Gán MasterDateDef cho MasterDataValue', () => {
		const { userMs } = mock()
		masterDataValue.createFormValue(userMs)
		expect(masterDataValue.masterDataDef).toEqual(userMs)
	})
	it('Gen ra formValue với giá trị rỗng tương ướng với MasterDataDef', () => {
		const { userMs, stringFieldDef, numberFieldDef } = mock()
		const stringValue = FieldValue.builder()
		stringValue.setFieldDef(stringFieldDef)
		const numberValue = FieldValue.builder()
		numberValue.setFieldDef(numberFieldDef)
		masterDataValue.createFormValue(userMs)
		expect(masterDataValue.getAllValue()).toEqual([stringValue, numberValue])
	})
})
describe('MasterDataValue.getValue', () => {
	it('Trả về giá trị của Field có code tương ứng', () => {
		const { userMs, stringFieldDef, numberFieldDef } = mock()
		const stringValue = FieldValue.builder()
		stringValue.setFieldDef(stringFieldDef)
		const numberValue = FieldValue.builder()
		numberValue.setFieldDef(numberFieldDef)
		masterDataValue.createFormValue(userMs)
		expect(masterDataValue.getValue(numberFieldDef.code)).toEqual(numberValue)
		expect(masterDataValue.getValue(stringFieldDef.code)).toEqual(stringValue)
	})
	it('Báo lỗi nếu field không tồn tại', () => {
		const { userMs, stringFieldDef, numberFieldDef } = mock()

		const stringValue = FieldValue.builder()
		stringValue.setFieldDef(stringFieldDef)

		const numberValue = FieldValue.builder()
		numberValue.setFieldDef(numberFieldDef)

		masterDataValue.createFormValue(userMs)

		expectError.addError({
			property: 'formValue',
			code: 'NOTFOUND',
			detailInfo: '123',
		})

		try {
			masterDataValue.getValue('123')
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})

describe('MasterDataValue.build', () => {
	it('Báo lỗi nếu trường MasterDataDef chưa có giá trị', () => {
		expectError.addError({
			property: 'masterDataDef',
			code: 'ISEMPTY',
		})
		try {
			masterDataValue.build()
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
	it('Báo lỗi nếu trường value chưa có giá trị', () => {
		const { userMs } = mock()
		masterDataValue.createFormValue(userMs)
		expectError.addError({
			property: 'formValue',
			code: 'ISEMPTY',
		})
		try {
			masterDataValue.build()
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})
