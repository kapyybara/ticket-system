import './app.css'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model'
import { signal } from '@preact/signals'
import { useRef } from 'preact/hooks'
import { CellClickedEvent } from 'ag-grid-community'
import { AgGridPreact } from './AgGridPreact'

export function App() {
	const gridApi = useRef(null)
	const gridColumnApi = useRef(null)

	const rowData = signal([
		{ make: 'Toyota', model: 'Celica', price: 35000 },
		{ make: 'Ford', model: 'Mondeo', price: 32000 },
		{ make: 'Porsche', model: 'Boxster', price: 72000 },
	])
	const colDefs = signal([
		{ field: 'make' },
		{ field: 'model' },
		{ field: 'price' },
	])

	function onGridReady(r: any) {
		gridApi.current = r.api
		gridColumnApi.current = r.columnApi
		console.log(r)
	}

	function cellValueChangedHanle(p: any) {
		console.log(p)
	}
	const options = {
		onCellClicked: (event: CellClickedEvent) => console.log('Cell was clicked'),
		onCellValueChanged: (p: any) => {
			console.log(p)
		},
	}
	return (
		<div>
			<button
				onClick={() => (rowData.value = rowData.value.concat(rowData.value))}
			>
				AddData
			</button>
			<div
				className="ag-theme-alpine"
				style={{ height: 400, width: 600, margin: 10 }}
			>
				<AgGridPreact
					defaultColDef={{
						resizable: true,
						filter: true,
						flex: 1,
						sortable: true,
						editable: true,
					}}
					rowSelection="multiple"
					animateRows={true}
					onGridReady={onGridReady}
					rowData={rowData}
					columnDefs={colDefs}
					modules={[ClientSideRowModelModule]}
					gridOptions={options}
				></AgGridPreact>
			</div>
		</div>
	)
}
