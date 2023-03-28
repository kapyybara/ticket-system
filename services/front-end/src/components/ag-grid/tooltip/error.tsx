import { TooltipRendererParams } from 'ag-grid-community'
import $ from './index.module.scss'
import clx from 'classnames'

export function ErrorToolTip(props: any) {
	const colId = props.column.colId
	const error = props.data[`${colId}Error`]
	if (error.value)
		return (
			<div class={clx($.tooltip, $.tooltip_error, 'caption')}>
				<span class="material-symbols-rounded">warning</span>
				{error.value.list[0].code}
			</div>
		)
	return <></>
}
