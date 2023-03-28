import {
	AgPromise,
	ICellEditorComp,
	ICellEditorParams,
} from 'ag-grid-community'
import { render } from 'preact'

export class SelectEditor implements ICellEditorComp {
	private _eGui: HTMLElement
	private _value: any
	constructor() {
		this._eGui = document.createElement('div')
	}
	init(params: ICellEditorParams<any, any>): void | AgPromise<void> {
		this._value = params.value

		render(<SelectComponent field={params.value} />, this._eGui)
	}
	getValue() {
		return this._value
	}
	getGui(): HTMLElement {
		return this._eGui
	}
}

function SelectComponent(props: {
	field: {
		value: any
		setValue: (v: string) => void
		options: { value: string; label: string }[]
	}
}) {
	const { field } = props

	return (
		<select
			name="target"
			id="target"
			onChange={e => field.setValue((e.target as HTMLSelectElement).value)}
			value={field.value}
		>
			{field.options.map(option => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</select>
	)
}
