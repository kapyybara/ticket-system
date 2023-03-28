import { useId } from 'preact/hooks'
import { JSXInternal } from 'preact/src/jsx'

import clx from 'classnames'

import $ from './index.module.scss'

export function TextErea({
	label,
	value,
	setValue,
	errormsg,
}: {
	label: string
	value: JSXInternal.SignalLike<string | number | string[]>
	errormsg?: string
	setValue: (value: string) => any
}) {
	const id = useId()
	return (
		<div class={$.input}>
			<label class={clx($.input__label, 'label')} htmlFor={id}>
				{label}
			</label>
			<textarea
				class={clx($.input__main, 'body-2', {
					[$.input__main_error]: errormsg && errormsg !== '',
				})}
				id={id}
				type="text"
				value={value}
				onInput={e => setValue((e.target as HTMLInputElement).value)}
				rows={5}
			/>
			<span
				class={clx($.input__error, 'caption', {
					[$.input__error_error]: errormsg && errormsg !== '',
					[$.input__error_hide]: errormsg && errormsg === '',
				})}
			>
				<p>{errormsg}</p>
			</span>
		</div>
	)
}
