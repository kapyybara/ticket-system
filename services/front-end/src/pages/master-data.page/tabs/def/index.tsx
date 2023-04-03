import clx from 'classnames'
import { AgGridPreact } from '@data-grid/preact'

import { TextErea } from '@/components/form/text-area'
import { useMasterDataFormVM } from '@/viewmodels/masterDataDefForm.vm'
import { Input } from '@/components/form/input'
import $ from './index.module.scss'
import './index.scss'
import { AddButton } from '@/components/form/button/add'
import { SubmitButton } from '@/components/form/button/submit'

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
	console.log(!errors.value.name)

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
				<SubmitButton
					onClick={submit}
					disabled={
						!!(
							!name.value ||
							!!errors.value.name ||
							!code.value ||
							!!errors.value.code ||
							!rowData.value.length ||
							!!errors.value.fields.length
						)
					}
				/>
			</div>
		</div>
	)
}
