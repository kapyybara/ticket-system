import { FieldDef, MasterDataDef } from '@ithan/core'

const user = new MasterDataDef()
user.setName('User')
user.setCode('USER')
const newFieldDef = new FieldDef()
newFieldDef.setName('Name')
newFieldDef.setCode('NAME')
newFieldDef.setType({
	type: 'SCALAR',
	target: 'string',
})
user.createField(newFieldDef)
user.addDisplayField(newFieldDef.code)

const department = new MasterDataDef()
department.setName('department')
department.setCode('DEPARTMENT')
newFieldDef.setName('Name')
newFieldDef.setCode('NAME')
newFieldDef.setType({
	type: 'SCALAR',
	target: 'string',
})
department.createField(newFieldDef)
department.addDisplayField(newFieldDef.code)

export const masterDataDefmoc = [user, department]
