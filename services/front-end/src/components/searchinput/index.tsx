import { Signal } from '@preact/signals'
import clx from 'classnames'

import $ from './index.module.scss'

type SearchInputParams = {
	value: Signal<string>
	onSearch: (value: string) => any
}

export const SearchInput = (props: SearchInputParams) => {
	const { value, onSearch } = props
	return (
		<label class={$.input}>
			<input
				class={$.input__main}
				type="text"
				value={value}
				onInput={e => onSearch((e.target as HTMLInputElement).value)}
			/>
			<span class={clx('material-symbols-rounded', $.input__icon)}>search</span>
		</label>
	)
}
