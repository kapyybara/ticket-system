import { Router } from "express"

export const taskDefinitionRoute: Router = Router({mergeParams: true})

taskDefinitionRoute.get("/")
taskDefinitionRoute.get("/:id")
taskDefinitionRoute.post("/")
taskDefinitionRoute.put("/:id")
taskDefinitionRoute.delete(":id")