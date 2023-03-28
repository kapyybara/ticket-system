import { Request, Response } from "express"

import { DataElementDefinition, DataElementAttributeDefinition } from "@ithan/core"

import { makeHandler, ServiceError } from "./makeHandler"
import * as db from "../services/db/dataElement.db"

const apiToModel = (data: any): DataElementDefinition => {
    const dataElementDefinition = new DataElementDefinition()
    try {
        dataElementDefinition.setName(data.name).setCode(data.code)
        Object.values(data.attributeDefinitions).map((attrData: any) => {
            const attr = new DataElementAttributeDefinition()
            attr.setId(attrData.id)
            attr.setCode(attrData.code)
            attr.setName(attrData.name)
            attr.setType(attrData.type)
            dataElementDefinition.addAttributeDefinition(attr)
        })
        Object.values(data.displayAttributes).map((attr: any) => {
            dataElementDefinition.addDisplayAttribute(attr)
        })
        return dataElementDefinition
    } catch (err) {
        throw new ServiceError("LOGICAL", err as string)
    }
}

export const getDataElement = makeHandler(async (req: Request, res: Response) => {
    const { id } = req.params
    const model = await db.getDataElementDefinition(id)
    return res.json(model)
})

export const getListDataElement = makeHandler(async (req: Request, res: Response) => {
    const modelList = await db.getListDataElementDefinition()
    return res.json(modelList)
})

export const insertDataElement = makeHandler(async (req: Request, res: Response) => {
    let model = apiToModel(req.body)
    model = await db.insertDataElementDefinition(model)
    return res.json(model)
})

export const updateDataElement = makeHandler(async (req: Request, res: Response) => {
    const { id } = req.params
    let model = apiToModel(req.body)
    model = await db.updateDataElementDefinition(id, model)
    return res.json(model)
})

export const deleteDataElement = makeHandler(async (req: Request, res: Response) => {
    const { id } = req.params
    await db.deleteDataElementDefinition(id)
    await res.json({result: "Done"})
})