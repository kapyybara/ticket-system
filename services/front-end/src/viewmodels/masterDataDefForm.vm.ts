import { masterDataDefmoc } from './.moct'
import { useMemo } from 'preact/hooks'
import {
	BaseError,
	FieldDefError,
	MasterDataDefError,
} from '@ithan/core/src/models/exceptions'
import { ReadonlySignal, Signal, computed, signal } from '@preact/signals'
import { ColDef, ColGroupDef, ValueParserParams } from 'ag-grid-community'
import { v4 as uuid } from 'uuid'

import { FieldDef, FieldType, MasterDataDef } from '@ithan/core'

import { ErrorTooltip } from '@/components/ag-grid/tooltip'
import { SelectorRenderer } from '@/components/ag-grid/type-selector/renderer'

export type FieldData = {
	id: string
	name: Signal<string>
	nameError: Signal<MasterDataDefError | null>
	code: Signal<string>
	codeError: Signal<MasterDataDefError | null>
	type: Signal<FieldType>
}

export class MasterDataFormVM<E extends BaseError, TData = FieldData> {
	private _masterDataDef: MasterDataDef

	private _name: Signal<string>
	private _code: Signal<string>
	private _description: Signal<string>
	private _rowData: Signal<FieldData[]>

	private _nameError: Signal<MasterDataDefError | null>
	private _codeError: Signal<MasterDataDefError | null>
	private _descriptionError: Signal<MasterDataDefError | null>
	private _fieldsError: Signal<MasterDataDefError[]>
	constructor() {
		this._name = signal('')
		this._code = signal('')
		this._description = signal('')
		this._description = signal('')
		this._rowData = signal([])

		this._nameError = signal(null)
		this._codeError = signal(null)
		this._descriptionError = signal(null)
		this._fieldsError = signal([])
		const masterDataDef = (this._masterDataDef = new MasterDataDef())
		masterDataDef.setName('')
		masterDataDef.setCode('')
		masterDataDef.setDescription('')
	}
	public get name(): ReadonlySignal<string> {
		return computed(() => this._name.value)
	}
	public get code(): ReadonlySignal<string> {
		return computed(() =>
			this._code.value
				.toUpperCase()
				.trim()
				.replaceAll(/\s\s+/g, ' ')
				.replaceAll(' ', '_'),
		)
	}
	public get errors(): ReadonlySignal<any> {
		return computed(() => ({
			name: this._nameError.value,
			code: this._codeError.value,
			fields: this._fieldsError.value.filter(
				(e, i, a) =>
					a.findIndex(
						e1 =>
							e1.list[0].code === e.list[0].code &&
							e1.list[0].detailInfo === e.list[0].detailInfo,
					) === i,
			),
		}))
	}
	public get description(): ReadonlySignal<string> {
		return computed(() => this._description.value)
	}
	public get rowData(): ReadonlySignal<FieldData[]> {
		return this._rowData
	}
	public get columnDefs() {
		return signal([
			{
				field: 'name',
				tooltipField: 'name',
				valueParser: (p: ValueParserParams) => {
					if (p.oldValue !== p.newValue) {
						const { id, name, nameError } = p.data
						name.value = p.newValue
						try {
							this._masterDataDef.updateField(id, { name: p.newValue })
						} catch (e) {
							if (e instanceof FieldDefError) {
								nameError.value = e
								return p.oldValue
							}
						}
						nameError.value = null
					}
					return p.oldValue
				},
				tooltipComponent: ErrorTooltip,
				cellClassRules: {
					'cell-error': (p: any) => {
						return p.data.nameError.value
					},
				},
			},
			{
				field: 'code',
				tooltipField: 'code',
				valueParser: (p: ValueParserParams) => {
					if (p.oldValue !== p.newValue) {
						const { id, code, codeError } = p.data
						code.value = p.newValue
						this._fieldsError.value = this._fieldsError.value.filter(
							i => i.list[0].detailInfo !== id,
						)

						p.oldValue.value = p.oldValue.value
							.toUpperCase()
							.trim()
							.replaceAll(/\s\s+/g, ' ')
							.replaceAll(' ', '_')

						try {
							this._masterDataDef.updateField(id, { code: p.newValue })
						} catch (e) {
							if (
								e instanceof FieldDefError ||
								e instanceof MasterDataDefError
							) {
								codeError.value = e
							}
							if (e instanceof MasterDataDefError) {
								this._fieldsError.value = this._fieldsError.value.concat([e])
							}
							return p.oldValue
						}

						codeError.value = null
					}
					return p.oldValue
				},
				tooltipComponent: ErrorTooltip,
				cellClassRules: {
					'cell-error': (p: any) => {
						return p.data.codeError.value
					},
				},
			},
			{
				field: 'type',
				editable: false,
				cellRenderer: SelectorRenderer,
				cellClassRules: {
					'cell-select': () => true,
				},
			},
		])
	}
	public get gridOptions() {
		const defaultColDef = {
			resizable: true,
			filter: true,
			flex: 1,
			sortable: true,
			editable: true,
		}
		return {
			defaultColDef,
			tooltipShowDelay: 0,
			tooltipMouseTrack: true,
		}
	}
	public static searchMasterDataDef(key: string): MasterDataDef[] {
		// ! Call api here
		const rs = masterDataDefmoc
		const nkey = key.toLocaleLowerCase()
		return rs.filter(
			i =>
				i.name.toLocaleLowerCase().includes(nkey) ||
				i.code.toLocaleLowerCase().includes(nkey),
		)
	}
	public setName = (name: string) => {
		this._name.value = name
		try {
			this._masterDataDef.setName(name)
		} catch (error) {
			if (error instanceof MasterDataDefError) {
				if (!this._nameError.value) this._nameError.value = error
				return
			} else throw error
		}
		this._nameError.value = null
	}
	public setCode = (code: string) => {
		this._code.value = code
		try {
			this._masterDataDef.setCode(code)
		} catch (error) {
			if (error instanceof MasterDataDefError) {
				if (!this._codeError.value) this._codeError.value = error
				return
			} else throw error
		}
		this._codeError.value = null
	}
	public setDescription = (des: string) => {
		this._description.value = des
		try {
			this._masterDataDef.setDescription(des)
		} catch (error) {
			if (error instanceof MasterDataDefError) {
				this._descriptionError.value = error
				return
			} else throw error
		}
	}
	public addField = () => {
		const newFieldDef = new FieldDef()
		newFieldDef.setName('New Name')
		newFieldDef.setCode('CODE' + uuid().slice(0, 2))
		newFieldDef.setType({
			type: 'SCALAR',
			target: 'string',
		})
		const { id, code, name, type } =
			this._masterDataDef.createField(newFieldDef)

		const options = signal([
			{ value: 'string', label: 'String' },
			{ value: 'number', label: 'Number' },
			{ value: 'date', label: 'Date' },
			{ value: 'datetime', label: 'Datetime' },
		])
		const searchKey = signal('')

		const handleOnsearch = (v: string) => {
			searchKey.value = v
			const masterDataDefFromAPI = MasterDataFormVM.searchMasterDataDef(v).map(
				i => ({ label: i.name, value: i.code, masterDataDef: i }),
			)
			options.value = options.value
				.concat(masterDataDefFromAPI)
				.filter((mdd, i, array) => {
					return array.findIndex(m => m.value === mdd.value) === i
				})
		}
		const handleOnChange = (v: any) => {
			let newType: FieldType
			console.log(v)
			if (v.masterDataDef) {
				newType = { type: 'MASTER_DATADEF', target: v.masterDataDef }
			} else {
				newType = { type: 'SCALAR', target: v.value }
			}
			this._masterDataDef.updateField(id, { type: newType })
		}
		const filterOptions = (v: { label: string; value: string }) =>
			v.label.toLowerCase().includes(searchKey.value.toLocaleLowerCase())

		const newField = {
			id,
			name: signal(name),
			nameError: signal(null),
			code: signal(code),
			codeError: signal(null),
			type: signal<FieldType>(type),
			searchKey,
			options,
			handleOnsearch,
			handleOnChange,
			filterOptions,
		}

		this._rowData.value = this._rowData.value.concat([newField])
	}
	public submit = () => {
		console.log(this._masterDataDef)
	}
}

export const useMasterDataFormVM = () => {
	const vm = useMemo(() => new MasterDataFormVM(), [])
	return vm
}
