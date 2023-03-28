import { MasterDataDef } from './MasterDataDef.model'

export type FieldType = {
	type: 'SCALAR' | 'MASTER_DATADEF'
	target: 'number' | 'string' | 'date' | 'datetime' | MasterDataDef
}

export type TaskOutCome = {
	id?: string
	outcome: 'DONE' | 'FAIL'
	subOutCome: string
}
