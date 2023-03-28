import { useId } from 'preact/hooks'

import clx from 'classnames'

import $ from './index.module.scss'
import { JSXInternal } from 'preact/src/jsx'
import { ReadonlySignal, Signal } from '@preact/signals'

export function Input({
	label,
	value,
	setValue,
	errormsg,
	icon,
	...rest
}: {
	label?: string
	value: ReadonlySignal<string> | string
	errormsg?: string
	setValue: (value: string) => any
} & JSXInternal.HTMLAttributes<HTMLInputElement>) {
	const id = useId()

	return (
		<div class={$.input}>
			{label && (
				<label class={clx($.input__label, 'label')} htmlFor={id}>
					{label}
				</label>
			)}
			<input
				class={clx($.input__main, 'body-2', {
					[$.input__main_error]: errormsg && errormsg !== '',
				})}
				id={id}
				type="text"
				value={value}
				onInput={e => setValue((e.target as HTMLInputElement).value)}
				{...rest}
			/>
			{icon && (
				<span class={clx($.icon, 'material-symbols-rounded')}>{icon}</span>
			)}
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
