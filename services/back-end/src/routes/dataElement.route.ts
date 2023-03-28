import { Router } from "express"

import * as handler from "../handlers/dataElement.handler"

export const dataElementDefinitionRoute: Router = Router({mergeParams: true})

dataElementDefinitionRoute.get("/", handler.getListDataElement)
dataElementDefinitionRoute.get("/:id", handler.getDataElement)
dataElementDefinitionRoute.post("/", handler.insertDataElement)
dataElementDefinitionRoute.put("/:id", handler.updateDataElement)
dataElementDefinitionRoute.delete("/:id", handler.deleteDataElement)

dataElementDefinitionRoute.get("/", handler.getListDataElement)
dataElementDefinitionRoute.get("/:id", handler.getDataElement)
dataElementDefinitionRoute.post("/", handler.insertDataElement)
dataElementDefinitionRoute.put("/:id", handler.updateDataElement)
dataElementDefinitionRoute.delete("/:id", handler.deleteDataElement)