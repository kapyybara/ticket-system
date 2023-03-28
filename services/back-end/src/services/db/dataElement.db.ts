import { Document, HydratedDocumentFromSchema, HydratedDocument } from "mongoose"

import { DataElementDefinition, DataElementAttributeDefinition } from "@ithan/core"

import { DataElementDefinitionRecord } from "./models/DataElementDefinition.db.models"

const modelToDb = (model: DataElementDefinition, existingRecord?: any): Document<typeof DataElementDefinitionRecord> => {
    console.log("Model", model)
    const record = existingRecord ? existingRecord : new DataElementDefinitionRecord()

    record.name = model.name
    record.code = model.code
    record.displayAttributes = model.displayAttributes
    record.attributeDefinitions = Object.values(model.attributeDefinitions).map((attr) => ({
        id: attr.id,
        code: attr.code,
        name: attr.name,
        type: attr.type.type,
        target: attr.type.target
    }))

    return record as any
}

const dbToModel = (record: any): DataElementDefinition => {
    const model = new DataElementDefinition()

    model.setId(record._id?.toString())
    model.setCode(record.code as string)
    model.setName(record.name as string)
    record.displayAttributes.map((attr: any) => model.addDisplayAttribute(attr))
    record.attributeDefinitions.map((attrData: any) => {
        const attr = new DataElementAttributeDefinition()
        attr.setId(attrData.id)
        attr.setCode(attrData.code)
        attr.setName(attrData.name)
        attr.setType({
            type: attrData.type,
            target: attrData.target
        })
        model.addAttributeDefinition(attr)
    })

    return model
}

export const getDataElementDefinition = async (id: DataElementDefinition['id']): Promise<DataElementDefinition> => {
    const data = await DataElementDefinitionRecord.findById(id)
    return dbToModel(data)
}

export const getListDataElementDefinition = async (): Promise<DataElementDefinition[]> => {
    const data = await DataElementDefinitionRecord.find()
    return data.map((val: any) => dbToModel(val))
}

export const insertDataElementDefinition = async (dataElementDefinition: DataElementDefinition): Promise<DataElementDefinition> => {

    const record = modelToDb(dataElementDefinition)

    await record.save()

    return dbToModel(record)
}

export const updateDataElementDefinition = async (id: DataElementDefinition['id'], model: DataElementDefinition): Promise<DataElementDefinition> => {
    const existingRecord = await DataElementDefinitionRecord.findById(id)
    const updateRecord = modelToDb(model, existingRecord)
    
    const record = await updateRecord.save()

    return dbToModel(record)
}

export const deleteDataElementDefinition = async (id: DataElementDefinition['id']): Promise<void> => {
    await DataElementDefinitionRecord.findByIdAndDelete(id)
}
