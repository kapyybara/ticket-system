import { MasterDataDef } from '@ithan/core'
import { db } from '.'
import { MasterDataDefError } from '@ithan/core/src/models/exceptions'
import { ServiceError } from '../../handlers/makeHandler'

export class MasterDataDefDB {
	public static create = async (model: MasterDataDef) => {
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
				const newErr = new MasterDataDefError()
				if (e.code === 'P2002') {
					newErr.addError({
						property: e.meta.target[0],
						code: 'ISEXIST',
					})
				}
				const serviceError = new ServiceError('LOGICAL', newErr)
				throw serviceError
			})
	}
	public static getItems = async ({
		page,
		size,
	}: {
		page: number
		size: number
	}): Promise<{
		total: number
		page: number
		size: number
		items: any[]
	}> => {
		const total = await db.masterDataDef.count()
		const items = await db.masterDataDef.findMany({
			skip: (page - 1) * size,
			take: size,
		})

		return {
			total,
			page,
			size,
			items,
		}
	}
	public static findAllByName = async (q: string) => {
		return await db.masterDataDef.findMany({
			where: {
				OR: [
					{
						name: {
							contains: q,
							mode: 'insensitive',
						},
					},
					{
						code: {
							contains: q,
							mode: 'insensitive',
						},
					},
				],
			},
		})
	}
}
