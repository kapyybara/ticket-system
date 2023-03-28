import { ITooltipComp, ITooltipParams } from 'ag-grid-community'
import { render } from 'preact'
import { JSXInternal } from 'preact/src/jsx'
import { ErrorToolTip } from './error'

function createToolTip(ToolTip: (...args: any[]) => JSXInternal.Element) {
	return class CustomTooltip implements ITooltipComp {
		eGui: any
		init(params: ITooltipParams) {
			const eGui = (this.eGui = document.createElement('div'))
			render(<ToolTip {...params} />, eGui)
		}
		getGui() {
			return this.eGui
		}
	}
}

export const ErrorTooltip = createToolTip(ErrorToolTip)
