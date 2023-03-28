import clx from 'classnames'
import { AgGridPreact } from '@data-grid/preact'

import { TextErea } from '@/components/form/text-area'
import { useMasterDataFormVM } from '@/viewmodels/masterDataDefForm.vm'
import { Input } from '@/components/form/input'
import $ from './index.module.scss'
import './index.scss'
import { AddButton } from '@/components/form/button/add'

export function MasterDataDef() {
	const {
		name,
		code,
		errors,
		description,
		rowData,
		columnDefs,
		gridOptions,
		setName,
		setCode,
		setDescription,
		addField,
		submit,
	} = useMasterDataFormVM()
	console.log('Redner')
	console.log(errors.value.fields)

	return (
		<div class={$.mddef}>
			<div class={$.mddef__group1}>
				<Input
					value={name}
					setValue={setName}
					label="Name"
					errormsg={errors.value.name?.list[0].code}
				/>
				<Input
					value={code}
					setValue={setCode}
					label="Code"
					errormsg={errors.value.code?.list[0].code}
				/>
			</div>
			<TextErea
				label="Description"
				value={description}
				setValue={setDescription}
				errormsg={errors.value.description?.list[0].code}
			/>
			<div class={$.table}>
				<div class={$.table__header}>
					<label class={clx('label')}>Attributes</label>
					<AddButton onClick={addField}></AddButton>
				</div>
				<div class={$.table__body}>
					<AgGridPreact
						class="ag-theme-alpine"
						// animateRows={true}
						rowData={rowData}
						columnDefs={columnDefs}
						gridOptions={gridOptions}
					/>
				</div>
			</div>
			<div class={$.mddef__footer}>
				<button onClick={submit}>
					<span class="material-symbols-rounded">ios_share</span>Submit
				</button>
			</div>
		</div>
	)
}

// {
/* {form.fields.map(field => (
					<div style={{ display: 'flex', flexDirection: 'row' }}>
						<input
							type="text"
							value={field.name}
							onInput={e => field.setName((e.target as HTMLInputElement).value)}
						/>
						{field.errors.name?.list.map(e => (
							<span>{e.code}</span>
						))}
						<input
							type="text"
							value={field.code}
							onInput={e => field.setCode((e.target as HTMLInputElement).value)}
						/>
						{field.errors.code?.list.map(e => (
							<span>{e.code}</span>
						))}
						<select
							name="type"
							id="type"
							onChange={e =>
								field.setType(
									(e.target as HTMLSelectElement).value as FieldType['type'],
								)
							}
							value={field.type.value}
						>
							{field.type.options.map(option => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</select>
						<input
							type="text"
							onInput={e =>
								field.searchMasterDataDef((e.target as HTMLInputElement).value)
							}
						/>
						<select
							name="target"
							id="target"
							onChange={e =>
								field.setTarget((e.target as HTMLSelectElement).value)
							}
							value={field.target.value}
						>
							{field.target.options.map(option => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</select>
						<button onClick={() => form.deleteField(field.id)}>Delete</button>
					</div>
				))} */
// }
