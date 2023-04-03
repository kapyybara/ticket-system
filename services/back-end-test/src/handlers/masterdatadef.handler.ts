import { Request, Response } from 'express'

import { FieldDef, MasterDataDef } from '@ithan/core'
import { makeHandler } from './makeHandler'
import { MasterDataDefDB as db } from '../services/db'

export const create = makeHandler(async (req: Request, res: Response) => {
	const model = jsonToModel(req.body)
	const rs = await db.create(model)
	res.status(201).json(rs)
})

export const getAll = makeHandler(async (req: Request, res: Response) => {})

function jsonToModel(data: Partial<MasterDataDef>) {
	try {
		const masterDataDef = MasterDataDef.builder()
		masterDataDef.setName(data.name)
		masterDataDef.setCode(data.code)
		masterDataDef.setDescription(data.description)
		data.form?.map(f => {
			const fieldModel = new FieldDef()
			fieldModel.setName(f.name)
			fieldModel.setCode(f.code)
			fieldModel.setType(f.type)
			return masterDataDef.createField(fieldModel)
		})
		data.displayField?.map(f => masterDataDef.addDisplayField(f))
		return masterDataDef.build()
	} catch (error) {
		throw error
	}
}
