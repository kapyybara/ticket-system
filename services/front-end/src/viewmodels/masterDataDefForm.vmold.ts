import { FieldDefInputVM } from './fieldDefInput.vm'
import { FieldDef, MasterDataDef } from '@ithan/core'
import { MasterDataDefError } from '@ithan/core/src/models/exceptions'
import { Signal, computed, signal } from '@preact/signals'
import { InputVM, useInputVM } from './input.vm'
import { useMemo } from 'preact/hooks'
import { v4 as uuid } from 'uuid'
import { ErrorTooltip } from '@/components/ag-grid/tooltip'
import { SelectEditor } from '@/components/ag-grid/selector'
import { SelectorRenderer } from '@/components/ag-grid/selector/renderer'

export class MasterDataDefForm {
	private _masterDataDef: MasterDataDef
	private _nameInputVM: InputVM<MasterDataDefError>
	private _codeInputVM: InputVM<MasterDataDefError>
	private _descriptionInputVM: InputVM<MasterDataDefError>
	private _fieldsVm: Signal<FieldDefInputVM[]>
	private _fieldsError: Signal<MasterDataDefError[]>

	constructor() {
		this._masterDataDef = MasterDataDef.builder()
		this._nameInputVM = useInputVM(
			'name',
			this._masterDataDef.setName,
			MasterDataDefError,
		)
		this._codeInputVM = useInputVM(
			'code',
			this._masterDataDef.setCode,
			MasterDataDefError,
		)
		this._descriptionInputVM = useInputVM(
			'description',
			this._masterDataDef.setDescription,
			MasterDataDefError,
		)
		this._fieldsVm = signal([])
		this._fieldsError = signal([])
	}
	public get name() {
		return computed(() => this._nameInputVM.value)
	}
	public get code() {
		return computed(() => this._codeInputVM.value)
	}
	public get description() {
		return computed(() => this._descriptionInputVM.value)
	}
	public get fields() {
		return this._fieldsVm.value.map(vm => ({
			id: vm.fieldDef.id,
			name: computed(() => vm.name.value),
			setCode: (value: string) => {
				this.updateField(vm.fieldDef.id, { code: value })
			},
			code: computed(() => vm.code.value),
			setName: (value: string) => {
				this.updateField(vm.fieldDef.id, { name: value })
			},
			errors: vm.errors.value,
			type: vm.type,
			setType: vm.setType,
			target: vm.target,
			setTarget: (value: string) => {
				const target = vm.setTarget(value)
				this.updateField(vm.fieldDef.id, {
					type: { type: vm.type.value.value, target: target },
				})
			},
			searchMasterDataDef: vm.searchMasterDataDef,
			vm: vm,
		}))
	}
	get errors() {
		return computed(() => ({
			code: this._codeInputVM.errors.value,
			name: this._nameInputVM.errors.value,
			description: this._descriptionInputVM.errors.value,
			form: this._fieldsError.value,
		}))
	}
	public setName = (value: string) => {
		this._nameInputVM.setValue(value)
	}
	public setCode = (value: string) => {
		this._codeInputVM.setValue(
			value.toUpperCase().trim().replaceAll(/\s\s+/g, ' ').replaceAll(' ', '_'),
		)
	}
	public setDescription = (value: string) => {
		this._descriptionInputVM.setValue(value)
	}
	/**
	 * Thêm 1 field trong danh sách
	 * Trường mới sẽ có name defualt và code default
	 */
	public addField = () => {
		const newFieldVM = new FieldDefInputVM()
		newFieldVM.setCode('CODE' + uuid().slice(0, 3).toUpperCase())
		try {
			this._masterDataDef.createField(newFieldVM.fieldDef)
		} catch (error) {}
		this._fieldsVm.value = this._fieldsVm.value.concat([newFieldVM])
	}
	/**
	 *  Xóa field của id truyền vào
	 * @param id
	 */
	public deleteField = (id: string) => {
		try {
			this._masterDataDef.deleteField(id)
			this._fieldsVm.value = this._fieldsVm.value.filter(
				f => f.fieldDef.id !== id,
			)
			this._fieldsError.value = this._fieldsError.value.filter(
				e => !e.list.find(i => i.detailInfo === id),
			)
		} catch (error) {
			if (error instanceof MasterDataDefError) {
			}
		}
	}
	public updateField = (id: string, field: Partial<FieldDef>) => {
		if (field.code !== undefined)
			this._fieldsVm.value
				.find(f => f.fieldDef.id === id)
				?.setCode(
					field.code
						.toUpperCase()
						.trim()
						.replaceAll(/\s\s+/g, ' ')
						.replaceAll(' ', '_'),
				)
		if (field.name !== undefined)
			this._fieldsVm.value.find(f => f.fieldDef.id === id)?.setName(field.name)
		try {
			this._masterDataDef.updateField(id, field)
		} catch (error) {
			if (error instanceof MasterDataDefError) {
				this._fieldsError.value = this._fieldsError.value.concat([error])
			}
		}
	}
	public submit = () => {
		console.log(this._masterDataDef)
	}
}

export const useMasterDataFormVM = () => {
	//SECTION - gop vao VM ben tren
	const form = useMemo(() => new MasterDataDefForm(), [])
	const rowData = computed(() =>
		form.fields.map(field => ({
			code: field.code,
			name: field.name,
			type: { ...field.type, setValue: field.setType },
			target: { ...field.target, setValue: field.setTarget },
			errors: {
				name: field.errors.name,
				code: field.errors.code,
			},
			id: field.id,
		})),
	)
	const columnDefs = signal([
		{
			field: 'name',
			tooltipField: 'name',
			cellClassRules: {
				'cell-error': (p: any) => p.data.errors.name,
			},
		},
		{
			field: 'code',
			tooltipField: 'code',
			cellClassRules: {
				'cell-error': (p: any) => p.data.errors.code,
			},
		},
		{
			field: 'type',
			cellEditor: SelectEditor,
			cellRenderer: SelectorRenderer,
			valueFormatter: p => {
				console.log(p)
				return p.value
			},
		},
		{ field: 'target' },
	])
	const defaultColDef = {
		resizable: true,
		filter: true,
		flex: 1,
		sortable: true,
		editable: true,
		valueParser: (p: any) => {
			const { oldValue, newValue, column } = p
			if (oldValue === newValue) {
				return oldValue
			}
			const columnId = column.colId
			const value = newValue
			const field = form.fields.find(i => i.id === p.data.id)
			switch (columnId) {
				case 'code':
					field?.setCode(value)
					break
				case 'name':
					field?.setName(value)
					break
				default:
					break
			}
			return p.oldValue
		},
		tooltipComponent: ErrorTooltip,
	}
	const gridOptions = {
		singleClickEdit: true,
		defaultColDef,
		tooltipShowDelay: 0,
		// tooltipHideDelay: 2000,
		tooltipMouseTrack: true,
	}
	//!SECTION
	return {
		form,
		columnDefs,
		rowData,
		gridOptions,
	}
}
