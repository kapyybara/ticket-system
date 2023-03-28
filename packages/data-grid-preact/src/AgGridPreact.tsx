import {
	ColDef,
	ColGroupDef,
	ColumnApi,
	ComponentUtil,
	Grid,
	GridOptions,
	Module,
} from 'ag-grid-community'
import { createRef } from 'preact'
import { useEffect, useRef } from 'preact/hooks'
import { memo } from 'preact/compat'
import { signal, effect, Signal } from '@preact/signals'
import { GridApi } from 'ag-grid-community'

const eGui = createRef()

type AgPreactUiProps<TData = any> = Omit<
	GridOptions<TData>,
	'rowData' | 'columnDefs'
> & {
	gridOptions?: GridOptions<TData>
	modules?: Module[]
	containerStyle?: any
	className?: string
	setGridApi?: (gridApi: GridApi<TData>, columnApi: ColumnApi) => void
	children?: any
	rowData: Signal<TData[]>
	columnDefs: Signal<(ColDef<TData> | ColGroupDef<TData>)[]>
	class?: any
	onGridReady?: (...arg: any[]) => any
}

const AgGridPreactUI = function <TData>(props: AgPreactUiProps<TData>) {
	const gridApi = useRef<GridApi | null>(null)
	const gridColumnApi = useRef(null)
	const grid = signal<Grid | null>(null)
	useEffect(() => {
		let gridOptions = props.gridOptions || {}
		const newProps = {
			...props,
			columnDefs: props.columnDefs.value,
			rowData: props.rowData.value,
			onGridReady: (r: any) => {
				gridApi.current = r.api
				gridColumnApi.current = r.columnApi
				if (props.onGridReady) props.onGridReady(r)
			},
		}
		gridOptions = ComponentUtil.copyAttributesToGridOptions(
			gridOptions,
			newProps,
		)
		grid.value = new Grid(eGui.current, gridOptions)

		return () => {
			grid.value?.destroy()
		}
	}, [])

	//NOTE update rowData
	effect(() => {
		const rowData = props.rowData.value
		gridApi.current?.setRowData(rowData)
	})
	effect(() => {
		const columnDefs = props.columnDefs.value
		gridApi.current?.setColumnDefs(columnDefs)
	})

	useEffect(() => {
		console.log('render')
	})

	return (
		<div
			ref={eGui}
			class={props.class}
			style={{ height: '100%', ...(props.containerStyle || {}) }}
		/>
	)
}

export const AgGridPreact = memo(AgGridPreactUI, () => true)
