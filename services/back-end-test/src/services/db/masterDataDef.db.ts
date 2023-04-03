import { MasterDataDef } from '@ithan/core'
import { db } from '.'
import { MasterDataDefError } from '@ithan/core/src/models/exceptions'

export const create = async (model: MasterDataDef) => {
	return db.masterDataDef
		.create({
			data: {
				name: model.name,
				code: model.code,
				displayField: model.displayField,
				description: model.description,
				form: {
					createMany: {
						//@ts-ignore
						data: model.form.map(f => ({
							name: f.name,
							code: f.code,
							type: f.type,
						})),
					},
				},
			},
		})
		.catch(e => {
			console.log(e)
			const newErr = new MasterDataDefError()
			if (e.code === 'P2002') {
				newErr.addError({
					property: e.meta.target[0],
					code: 'ISEXIST',
				})
			}
			newErr.throw()
		})
}
