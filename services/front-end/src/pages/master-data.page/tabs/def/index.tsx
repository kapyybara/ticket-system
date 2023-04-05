import clx from 'classnames'
import { AgGridPreact } from '@data-grid/preact'

import { TextErea } from '@/components/form/text-area'
import {
	MasterDataDefFormVM,
	useMasterDataFormVM,
} from '@/viewmodels/masterDataDefForm.vm'
import { Input } from '@/components/form/input'
import $ from './index.module.scss'
import './index.scss'
import { AddButton } from '@/components/form/button/add'
import { SubmitButton } from '@/components/form/button/submit'

export function MasterDataDef(props: { form: MasterDataDefFormVM }) {
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
		readySubmit,
	} = props.form
	console.warn('Def page render')

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
				<SubmitButton onClick={submit} disabled={readySubmit} />
			</div>
		</div>
	)
}
