import { Request, Response } from 'express'

import { FieldDef, MasterDataDef } from '@ithan/core'
import { ServiceError, makeHandler } from './makeHandler'
import { MasterDataDefDB as db } from '../services/db/masterDataDef.db'
import { MasterDataDefError } from '@ithan/core/src/models/exceptions'

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

export class MasterDataDefHandler {
	public static create = makeHandler(async (req: Request, res: Response) => {
		const model = jsonToModel(req.body)
		const rs = await db.create(model)
		res.status(201).json(rs)
	})
	public static getItems = makeHandler(async (req: Request, res: Response) => {
		const query = req.query
		let page = parseInt(query.page as string)
		let size = parseInt(query.size as string)
		const q = query.q as string

		if (q) {
			const rs = await db.findAllByName(q)
			if (rs.length === 0) {
				return res.status(404).json([])
			}
			return res.status(200).json(rs)
		}

		if (page && size) {
			const rs = await db.getItems({ page, size })
			if (rs.items.length === 0) {
				return res.status(404).json({
					total: rs.total,
					page: rs.page,
					size: rs.size,
					items: rs.items,
				})
			}
			return res.status(200).json({
				total: rs.total,
				page: rs.page,
				size: rs.size,
				items: rs.items,
			})
		}
		return res.status(400).json({})
	})
}
