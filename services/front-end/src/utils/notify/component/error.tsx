import clx from 'classnames'

import $ from './index.module.scss'
import { Timer } from '@/utils/timer'

type NotifyProps = {
	msg: string
	timer: Timer
}

export default function NotifyError(props: NotifyProps) {
	return (
		<div
			onMouseEnter={() => props.timer.pause()}
			onMouseLeave={() => props.timer.resume()}
			class={clx($.notify, $.error)}
		>
			<span
				onClick={() => props.timer.break()}
				class={clx($.close, 'material-symbols-rounded')}
			>
				close
			</span>
			<span class="material-symbols-rounded">done_all</span>
			<span class={$.msg}>{props.msg}</span>
		</div>
	)
}
