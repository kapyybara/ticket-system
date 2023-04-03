import { Signal, signal } from '@preact/signals'
import { useMemo } from 'preact/hooks'

export class Timer {
	timeId: any
	start: any
	time: Signal<number>
	callback: any

	constructor(callback: any, time: number) {
		this.time = signal(time)
		this.callback = callback
		this.resume()
	}
	pause = () => {
		const currentTime = new Date().getTime()
		this.time.value = this.time.value - (currentTime - this.start)
		clearTimeout(this.timeId)
	}
	resume = () => {
		this.start = new Date().getTime()
		this.timeId = setTimeout(this.callback, this.time.value)
	}
	break = () => {
		this.callback()

		clearTimeout(this.timeId)
	}
}

export const useTimer = (fn: any, time: number) =>
	useMemo(() => new Timer(fn, time), [])
