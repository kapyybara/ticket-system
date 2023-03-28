import { useEffect } from 'preact/hooks'

export function useOnClickOutside(ref: unknown, handler: unknown) {
	useEffect(() => {
		const listener = (event: { target: any }) => {
			// Do nothing if clicking ref's element or descendent elements
			//@ts-ignore
			if (!ref.current || ref.current.contains(event.target)) {
				return
			}
			//@ts-ignore
			handler(event)
		}
		document.addEventListener('mousedown', listener)
		document.addEventListener('touchstart', listener)
		return () => {
			document.removeEventListener('mousedown', listener)
			document.removeEventListener('touchstart', listener)
		}
	}, [ref, handler])
}
