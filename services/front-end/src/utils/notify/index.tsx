import { memo } from 'preact/compat'
import { useMemo } from 'preact/hooks'
import NotifySuccess from './component/success'
import { v4 as uuid } from 'uuid'

import $ from './index.module.scss'
import { signal } from '@preact/signals'
import NotifyError from './component/error'
import { Timer } from '../timer'
import NotifyWarn from './component/warn'

type NotifyOptions = {}
type NotifyProviderProps = {
	children: any
}
export type NotifyType = {
	id: any
	msg: string
	type: 'SUCCESS' | 'ERROR' | 'WARN'
	timer: Timer
}
const notifies = signal<NotifyType[]>([])
class Notify {
	constructor() {
		notifies.value = []
	}
	public success(msg: string, options?: NotifyOptions) {
		const id = uuid()
		const timer = new Timer(() => {
			notifies.value = notifies.value.filter(i => i.id !== id)
		}, 5000)
		const newNoti: NotifyType = { id, msg, type: 'SUCCESS', timer }
		notifies.value = notifies.value.concat([newNoti])
	}
	public warn(msg: string, options?: NotifyOptions) {
		const id = uuid()
		const timer = new Timer(() => {
			notifies.value = notifies.value.filter(i => i.id !== id)
		}, 5000)
		const newNoti: NotifyType = { id, msg, type: 'WARN', timer }
		notifies.value = notifies.value.concat([newNoti])
	}
	public error(msg: string, options?: NotifyOptions) {
		const id = uuid()
		const timer = new Timer(() => {
			notifies.value = notifies.value.filter(i => i.id !== id)
		}, 5000)
		const newNoti: NotifyType = { id, msg, type: 'ERROR', timer }
		notifies.value = notifies.value.concat([newNoti])
	}
}

export const useNotify = () => useMemo(() => new Notify(), [])

export const NotifyProvider = (props: NotifyProviderProps) => {
	const Child = useMemo(
		() =>
			memo(
				() => <>{props.children}</>,
				() => true,
			),
		[],
	)

	return (
		<>
			<div class={$.notifies}>
				{notifies.value.map((n, i) => {
					switch (n.type) {
						case 'SUCCESS':
							return <NotifySuccess key={n.id} msg={n.msg} timer={n.timer} />
						case 'ERROR':
							return <NotifyError key={n.id} msg={n.msg} timer={n.timer} />
						case 'WARN':
							return <NotifyWarn key={n.id} msg={n.msg} timer={n.timer} />
						default:
							break
					}
				})}
			</div>
			<Child />
		</>
	)
}
