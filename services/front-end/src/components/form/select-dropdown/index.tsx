import { Signal, signal } from '@preact/signals'
import clx from 'classnames'

import $ from './index.module.scss'
import { Input } from '../input'
import { useMemo, useRef } from 'preact/hooks'
import { useOnClickOutside } from '@/hooks/use-onclickoutside'

export type OptionType = { value: string; label: string }
export type SelectDropDownParams = {
	searchKey: Signal<string> | string
	onSearch: (v: string) => void
	options: Signal<OptionType[]>
	onChange: (v: any) => void
	filterOptions: (
		value: OptionType,
		index: number,
		array: OptionType[],
	) => boolean
	placeHolder?: string
}

export function SelectDropDown({
	searchKey,
	onSearch,
	onChange,
	options,
	filterOptions,
	placeHolder,
}: SelectDropDownParams) {
	const showOptions = useMemo(() => signal(false), [])

	const ref = useRef(null)
	useOnClickOutside(ref, () => (showOptions.value = false))
	function handleSelect(v: string) {
		showOptions.value = false
		const option = options.value.find(i => i.value === v)
		option && onSearch(option.label)
		onChange(option)
	}

	return (
		<div class={$.wrap} ref={ref}>
			<input
				type="text"
				value={searchKey}
				onFocus={() => {
					showOptions.value = true
				}}
				onInput={(e: any) => onSearch((e.target as HTMLInputElement).value)}
				placeholder={placeHolder}
			/>
			<span class={clx($.icon, 'material-symbols-rounded')}>
				{showOptions.value ? 'search' : 'expand_more'}
			</span>
			<div class={clx($.dropdown, { [$.show]: showOptions.value })}>
				{options.value.filter(filterOptions).length === 0 ? (
					<div class={$.nodata}>
						<span class="material-symbols-rounded">folder_off</span>
						<p>No data</p>
					</div>
				) : (
					options.value.filter(filterOptions).map((o: any) => (
						<span value={o.value} onClick={e => handleSelect(o.value)}>
							{o.label}
						</span>
					))
				)}
			</div>
		</div>
	)
}
