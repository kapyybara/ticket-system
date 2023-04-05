import { MasterDataDef } from '@ithan/core'
import request from './api/axiosContext'
import { ServiceError } from '.'
import { AxiosError } from 'axios'

const modelToApi = (model: MasterDataDef) => {
	return {
		name: model.name,
		code: model.code,
		description: model.description,
		displayField: model.displayField,
		form: model.form.map(f => ({
			name: f.name,
			code: f.code,
			type: f.type,
		})),
	}
}

export class MasterDataDefService {
	public static create = async (
		model: MasterDataDef,
	): Promise<MasterDataDef> => {
		try {
			const res = await request({
				method: 'POST',
				url: 'master-data-def',
				body: modelToApi(model),
			})
			model.setId(res.data.id)
			return model
		} catch (err) {
			const data = (err as AxiosError<any, any>)?.response?.data as ServiceError
			const serviceError = new ServiceError(data.type, data.error)
			throw serviceError
		}
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
		items: MasterDataDef[]
	}> => {
		try {
			const res = await request({
				method: 'GET',
				url: 'master-data-def',
				params: { page, size },
			})
			const data = res.data
			return data
		} catch (err) {
			// @ts-ignore
			return err.response.data
		}
	}
	public static searchItems = async (q: string): Promise<MasterDataDef[]> => {
		try {
			const res = await request({
				method: 'GET',
				url: 'master-data-def',
				params: { q },
			})
			const data = res.data
			return data as MasterDataDef[]
		} catch (err) {
			//@ts-ignore
			if (err.response.status === 404) {
				return []
			}
		}
		return []
	}
}
