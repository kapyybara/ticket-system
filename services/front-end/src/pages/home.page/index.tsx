import { signal } from '@preact/signals'
import { Input } from '../../components/form/input'
import { SelectDropDown } from '@/components/form/select-dropdown'
import { options } from 'preact'

export function Home() {
	const key = signal('')
	const options = signal([
		{ value: 'string', label: 'String' },
		{ value: 'number', label: 'Number' },
		{ value: 'user', label: 'User' },
		{ value: 'dep', label: 'Dep' },
	])
	return (
		<div>
			<SelectDropDown
				searchKey={key}
				onSearch={v => (key.value = v)}
				options={options}
				onChange={v => {
					console.log(options.value.find(i => (i.value = v)))
				}}
				placeHolder="Type to search"
				filterOptions={(v, i, a) =>
					v.label.toLowerCase().includes(key.value.toLocaleLowerCase())
				}
			/>
		</div>
	)
}
