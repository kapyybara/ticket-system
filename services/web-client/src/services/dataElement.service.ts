import { DataElementDefinition } from "@ithan/core"

export const get = async (id: DataElementDefinition['id']): Promise<DataElementDefinition> => {
    return new DataElementDefinition()
}

export const getAll = async (): Promise<DataElementDefinition[]> => {
    return [new DataElementDefinition()]
}

export const create = async (dataElementDefinition: DataElementDefinition): Promise<DataElementDefinition> => {

}

export const update = async (id: DataElementDefinition['id'], dataElementDefinition: DataElementDefinition): Promise<DataElementDefinition> => {

}

export const remove = async (id: DataElementDefinition['id']): Promise<boolean> => {

}