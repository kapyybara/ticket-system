import { Router } from "express"

export const ticketDefinitionRoute: Router = Router({mergeParams: true})

ticketDefinitionRoute.get("/")
ticketDefinitionRoute.get("/:id")
ticketDefinitionRoute.post("/")
ticketDefinitionRoute.put("/:id")
ticketDefinitionRoute.delete(":id")