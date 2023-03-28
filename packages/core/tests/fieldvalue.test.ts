import { FieldDef, FieldValue, MasterDataDef } from '@src/models'
import { FieldValueError } from '@src/models/exceptions/fieldvalue.error'
import { MasterDataValueError } from '@src/models/exceptions/masterdatavalue.error'

import { v4 as uuid } from 'uuid'

function mock() {
	//! string
	const stringFieldDef = FieldDef.builder()
	stringFieldDef.setId(uuid())
	stringFieldDef.setName('User name')
	stringFieldDef.setCode('USER_NAME')
	stringFieldDef.setType({
		type: 'SCALAR',
		target: 'string',
	})
	//! number
	const numberFieldDef = FieldDef.builder()
	numberFieldDef.setId(uuid())
	numberFieldDef.setName('Age')
	stringFieldDef.setCode('AGE')
	numberFieldDef.setType({
		type: 'SCALAR',
		target: 'number',
	})
	//! date
	const dateFieldDef = FieldDef.builder()
	dateFieldDef.setId(uuid())
	dateFieldDef.setName('birth')
	stringFieldDef.setCode('BIRTH')
	dateFieldDef.setType({
		type: 'SCALAR',
		target: 'date',
	})
	//! datetime
	const datetimeFieldDef = FieldDef.builder()
	datetimeFieldDef.setId(uuid())
	datetimeFieldDef.setName('deadline')
	stringFieldDef.setCode('DEADLINE')
	datetimeFieldDef.setType({
		type: 'SCALAR',
		target: 'datetime',
	})
	const userMs = MasterDataDef.builder()
	userMs.setId(uuid())
	userMs.setName('User data')
	userMs.setCode('USER_DATA')
	userMs.createField(stringFieldDef)
	userMs.createField(numberFieldDef)
	//! masterdata
	const masterdataFieldDef: FieldDef = FieldDef.builder()
	masterdataFieldDef.setId(uuid)
	masterdataFieldDef.setName('User name')
	masterdataFieldDef.setCode('USER_NAME')
	masterdataFieldDef.setType({
		type: 'MASTER_DATADEF',
		target: userMs,
	})

	return {
		stringFieldDef: stringFieldDef.build(),
		dateFieldDef,
		datetimeFieldDef,
		numberFieldDef,
		masterdataFieldDef,
	}
}

let fieldValue = FieldValue.builder()
let expectError = new FieldValueError()
let receivedError = new FieldValueError()
beforeEach(() => {
	fieldValue = FieldValue.builder()
	expectError = new FieldValueError()
	receivedError = new FieldValueError()
})

describe('FieldValue.setValue', () => {
	it('set Value cho Field có type là string', () => {
		const { stringFieldDef } = mock()
		const newFieldValue = FieldValue.builder()
		newFieldValue.setFieldDef(stringFieldDef)
		newFieldValue.setValue('Phạm Nhật Tiến')
		expect(newFieldValue.value).toEqual('Phạm Nhật Tiến')
	})
	it('set Value cho Field có type là number', () => {
		const { numberFieldDef } = mock()
		const newFieldValue = FieldValue.builder()
		newFieldValue.setFieldDef(numberFieldDef)
		newFieldValue.setValue(123)
		expect(newFieldValue.value).toEqual(123)
	})
	it('set Value cho Field có type là date hoặc datetime', () => {
		const { dateFieldDef } = mock()
		const newFieldValue = FieldValue.builder()
		newFieldValue.setFieldDef(dateFieldDef)
		const newDate = new Date('2023-03-07')
		newFieldValue.setValue(newDate)
		expect(newFieldValue.value).toEqual(newDate)
	})
	it('Báo lỗi nếu value = null || undefined ', () => {
		const { stringFieldDef } = mock()
		const newFieldValue = FieldValue.builder()
		newFieldValue.setFieldDef(stringFieldDef)
		expectError.addError({
			property: 'value',
			code: 'INVALID',
			detailInfo: undefined,
		})
		try {
			newFieldValue.setValue(undefined)
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))

		expectError.addError({
			property: 'value',
			code: 'INVALID',
			detailInfo: null,
		})
		try {
			newFieldValue.setValue(null)
		} catch (error) {
			receivedError = error
		}
		expectError = new FieldValueError()
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
	it('Báo lỗi nếu value không đúng type date và datetime', () => {
		const { dateFieldDef } = mock()
		const newFieldValue = FieldValue.builder()
		newFieldValue.setFieldDef(dateFieldDef)
		try {
			newFieldValue.setValue(123)
		} catch (error) {
			receivedError = error
		}

		expectError.addError({
			property: 'value',
			code: 'NOT_DATETIME',
			detailInfo: 123,
		})
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))

		try {
			newFieldValue.setValue('ole')
		} catch (error) {
			receivedError = error
		}
		expectError = new FieldValueError()
		expectError.addError({
			property: 'value',
			code: 'NOT_DATETIME',
			detailInfo: 'ole',
		})
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))

		try {
			newFieldValue.setValue('03/25/2022 12:00')
		} catch (error) {
			receivedError = error
		}
		expectError = new FieldValueError()
		expectError.addError({
			property: 'value',
			code: 'NOT_DATETIME',
			detailInfo: '03/25/2022 12:00',
		})
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
	it('Báo lỗi nếu value không đúng type string', () => {
		const { stringFieldDef } = mock()
		const newFieldValue = FieldValue.builder()
		newFieldValue.setFieldDef(stringFieldDef)
		expectError.addError({
			property: 'value',
			code: 'NOT_STRING',
			detailInfo: 123,
		})
		try {
			newFieldValue.setValue(123)
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
	it('Báo lỗi nếu value không đúng type number', () => {
		const { numberFieldDef } = mock()
		const newFieldValue = FieldValue.builder()
		newFieldValue.setFieldDef(numberFieldDef)
		expectError.addError({
			property: 'value',
			code: 'NOT_NUMBER',
			detailInfo: 'Ola',
		})
		try {
			newFieldValue.setValue('Ola')
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})

	it('Báo lỗi nếu value không đúng MasterDataDef', () => {
		const { masterdataFieldDef } = mock()
		const newFieldValue = FieldValue.builder()
		newFieldValue.setFieldDef(masterdataFieldDef)
		try {
			newFieldValue.setValue(123)
		} catch (error) {
			receivedError = error
		}
		expectError = new FieldValueError()
		expectError.addError({
			property: 'value',
			code: 'NOT_MASTERDATA',
			detailInfo: 123,
		})
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
		try {
			newFieldValue.setValue('ole')
		} catch (error) {
			receivedError = error
		}
		expectError = new FieldValueError()
		expectError.addError({
			property: 'value',
			code: 'NOT_MASTERDATA',
			detailInfo: 'ole',
		})
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
		try {
			newFieldValue.setValue({ name: 'Phạm Nhật Tiến', userName: 'tien123' })
		} catch (error) {
			receivedError = error
		}
		expectError = new FieldValueError()
		expectError.addError({
			property: 'value',
			code: 'NOT_MASTERDATA',
			detailInfo: { name: 'Phạm Nhật Tiến', userName: 'tien123' },
		})
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})
describe('FieldValue.build', () => {
	it('Báo lỗi nếu trường FieldDef chưa có gía trị ', () => {
		const newFieldValue = FieldValue.builder()
		expectError.addError({
			property: 'fieldDef',
			code: 'ISEMPTY',
		})
		try {
			newFieldValue.build()
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
	it('Báo lỗi nếu trường value chưa có gía trị ', () => {
		const { stringFieldDef } = mock()
		const newFieldValue = FieldValue.builder()
		newFieldValue.setFieldDef(stringFieldDef)

		expectError.addError({
			property: 'value',
			code: 'ISEMPTY',
		})

		try {
			newFieldValue.build()
		} catch (error) {
			receivedError = error
		}
		expect(receivedError.list).toEqual(expect.arrayContaining(expectError.list))
	})
})
