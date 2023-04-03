import { signal } from '@preact/signals'
import { SelectDropDown } from '@/components/form/select-dropdown'
import { useNotify } from '@/utils/notify'

export function Home() {
	const key = signal('')
	const options = signal([
		{ value: 'string', label: 'String' },
		{ value: 'number', label: 'Number' },
		{ value: 'user', label: 'User' },
		{ value: 'dep', label: 'Dep' },
	])

	const notify = useNotify()

	const handleClick = () => {
		notify.success('Hihi success haah')
		notify.success('Hihi success haah')
		notify.warn('Hihi success haah')
		notify.success('Hihi success haah')
		notify.error('Hihi success haah')
	}

	return (
		<div>
			<button onClick={handleClick}>Noti tititit</button>
		</div>
	)
}
