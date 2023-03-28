import { OptionType, SelectDropDown } from '@/components/form/select-dropdown'
import { MasterDataFormVM } from '@/viewmodels/masterDataDefForm.vm'
import { Signal, signal } from '@preact/signals'
import {
	AgPromise,
	ICellRendererComp,
	ICellRendererParams,
} from 'ag-grid-community'
import { render } from 'preact'

export class SelectorRenderer implements ICellRendererComp {
	_eGui: HTMLElement

	constructor() {
		this._eGui = document.createElement('div')
	}
	getGui(): HTMLElement {
		return this._eGui
	}
	init?(params: ICellRendererParams<any, any>): void | AgPromise<void> {
		const {
			searchKey,
			handleOnsearch,
			handleOnChange,
			options,
			filterOptions,
		} = params.data
		render(
			<SelectDropDown
				searchKey={searchKey}
				onSearch={handleOnsearch}
				onChange={handleOnChange}
				options={options}
				filterOptions={filterOptions}
			/>,
			this._eGui,
		)
	}
	refresh(params: ICellRendererParams<any, any>): boolean {
		return true
		// throw new Error("Method not implemented.");
	}
}
