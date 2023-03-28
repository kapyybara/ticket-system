import { HTMLAttributes } from 'preact/compat'
import $ from '../index.module.scss'

export function AddButton(
	props: HTMLAttributes<HTMLButtonElement> & { children?: string },
) {
	const { children, ...rest } = props
	return (
		<button class={$.add} {...rest}>
			<span class="material-symbols-rounded">add</span>
			{children || 'Add'}
		</button>
	)
}
