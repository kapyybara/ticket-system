import { GridOptions } from 'ag-grid-community'

export class ComponentUtil {
	public static copyAttributesToGridOptions(
		gridOptions: GridOptions | undefined,
		props: any,
	) {
		if (typeof gridOptions !== 'object') {
			gridOptions = {} as GridOptions
		}
	}
}
