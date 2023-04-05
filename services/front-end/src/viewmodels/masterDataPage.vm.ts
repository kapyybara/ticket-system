import { useMemo } from 'preact/hooks'
import { MasterDataDefService as service } from '@/services/masterDataDef.service'

import { MasterDataDef } from '@ithan/core'
import { MasterDataDefFormVM } from './masterDataForm.vm'
import { Signal, computed, effect, signal } from '@preact/signals'

export class MasterDataDefPageVM {
	private _masterDataDefs: Signal<MasterDataDef[]>
	private _form: MasterDataDefFormVM
	private _searchKey: Signal<string>
	private _page: Signal<number>
	private _total: Signal<number>
	private _listLoading: Signal<boolean>
	public size = 10

	constructor() {
		this._masterDataDefs = signal([])
		this._form = new MasterDataDefFormVM()
		this._searchKey = signal('')
		this._page = signal(0)
		this._total = signal(0)
		this._listLoading = signal(true)
		this.init()

		effect(async () => {
			if (this._searchKey.value !== '') {
				let data
				this._listLoading.value = true
				data = await service.searchItems(this._searchKey.value)
				this._masterDataDefs.value = data
				this._listLoading.value = false
			} else {
				this.init()
			}
		})
	}
	public get masterDataDefs(): Signal<MasterDataDef[]> {
		return this._masterDataDefs
	}
	public get masterDataDefFormVM(): MasterDataDefFormVM {
		return this._form
	}
	public get searchKey(): Signal<string> {
		return this._searchKey
	}
	public get listLoading() {
		return this._listLoading
	}
	public get readyToLoadMore() {
		return computed(
			() => Math.ceil(this._total.value / this.size) > this._page.value,
		)
	}

	public createMasterDataDef = (): void => {}
	public handleSelect = (id: string): void => {}
	public handleSearch = (query: string): void => {
		this._searchKey.value = query
	}
	public selectMasterDataDef(id: string): void {}
	private init = async () => {
		try {
			let data
			data = await service.getItems({ page: 1, size: this.size })
			this._masterDataDefs.value = data.items
			this._page.value = data.page
			this._total.value = data.total
			this._listLoading.value = false
		} catch (error) {
			return console.log({ error })
		}
	}
	public loadMore = async () => {
		try {
			let data
			data = await service.getItems({
				page: this._page.value + 1,
				size: this.size,
			})
			this._masterDataDefs.value = this._masterDataDefs.value.concat(data.items)
			this._page.value = data.page
			this._total.value = data.total
			this._listLoading.value = false
		} catch (error) {
			return console.log({ error })
		}
	}
}

export function useMasterDataDefPageVM() {
	return useMemo(() => new MasterDataDefPageVM(), [])
}
