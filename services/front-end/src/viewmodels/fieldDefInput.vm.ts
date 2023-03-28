import { masterDataDefmoc } from './.moct'
import { FieldDefError } from '@ithan/core/src/models/exceptions'
import { FieldDef, FieldType, MasterDataDef } from '@ithan/core'
import { useMemo } from 'preact/hooks'
import { InputVM } from './input.vm'
import { computed, signal } from '@preact/signals'

export class FieldDefInputVM {
	private _nameInputVM
	private _codeInputVM
	private _fiedDef
	private _type
	private _target
	private _targetOptions
	private _scalarTargets = [
		{
			label: 'number',
			value: 'number',
		},
		{
			label: 'string',
			value: 'string',
		},
		{
			label: 'date',
			value: 'date',
		},
		{
			label: 'datetime',
			value: 'datetime',
		},
	]
	masterDataDefs: MasterDataDef[]

	constructor() {
		this._fiedDef = new FieldDef()
		this._nameInputVM = new InputVM(
			'name',
			this._fiedDef.setName.bind(this._fiedDef),
			//@ts-ignore
			FieldDefError,
		)
		this._codeInputVM = new InputVM(
			'code',
			this._fiedDef.setCode.bind(this._fiedDef),
			//@ts-ignore
			FieldDefError,
		)
		this._type = signal<FieldType['type']>('SCALAR')
		this._target = signal<string>('string')
		this._targetOptions = signal<{ label: string; value: string }[]>(
			this._scalarTargets,
		)
		this.masterDataDefs = []
	}
	get fieldDef() {
		return this._fiedDef
	}
	get errors() {
		return computed<Record<'code' | 'name', FieldDefError | null>>(() => ({
			code: this._codeInputVM.errors.value,
			name: this._nameInputVM.errors.value,
		}))
	}
	get name() {
		return this._nameInputVM.value
	}
	public setName = (value: string) => {
		this._nameInputVM.setValue(value)
	}
	get code() {
		return this._codeInputVM.value
	}
	public setCode = (value: string) => {
		this._codeInputVM.setValue(value)
	}
	get type() {
		return {
			value: this._type,
			options: [
				{ value: 'SCALAR', label: 'Scalar' },
				{ value: 'MASTER_DATADEF', label: 'Master Data' },
			],
		}
	}
	public setType = (value: FieldType['type']) => {
		this._type.value = value
	}
	get target() {
		return {
			value: this._target,
			options: this._targetOptions.value,
		}
	}
	public setTarget = (value: string): FieldType['target'] => {
		this._target.value = value
		switch (this._type.value) {
			case 'SCALAR':
				return value as FieldType['target']
			case 'MASTER_DATADEF':
				// @ts-ignore
				return this.masterDataDefs.find(i => i.code === value)
		}
	}
	public searchMasterDataDef = (key: string) => {
		switch (this._type.value) {
			case 'SCALAR':
				this._targetOptions.value = this._scalarTargets.filter(
					i =>
						i.label.toLocaleLowerCase().includes(key.toLocaleLowerCase()) ||
						i.value.toLocaleLowerCase().includes(key.toLocaleLowerCase()),
				)
				break
			case 'MASTER_DATADEF':
				// NOTE Call api
				this.masterDataDefs = masterDataDefmoc.filter(
					i =>
						i.name.toLocaleLowerCase().includes(key.toLocaleLowerCase()) ||
						i.code.includes(key.toLocaleUpperCase()),
				)

				this._targetOptions.value = this.masterDataDefs.map(i => ({
					value: i.code,
					label: i.name,
				}))
				break
		}
	}
}

export const useFieldDefInputVM = () => {
	return useMemo(() => new FieldDefInputVM(), [])
}
