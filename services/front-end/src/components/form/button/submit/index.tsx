import { HTMLAttributes } from 'preact/compat'
import $ from '../index.module.scss'

export function SubmitButton(
	props: HTMLAttributes<HTMLButtonElement> & { children?: string },
) {
	const { children, ...rest } = props
	return (
		<button class={$.submit} {...rest}>
			<span class="material-symbols-rounded">ios_share</span>
			{children || 'Submit'}
		</button>
	)
}
