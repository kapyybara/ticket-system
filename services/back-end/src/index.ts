import express from "express"
import { Application } from "express"
import bodyParser from "body-parser"

import { runInitTasks } from "./init"

import { dataElementDefinitionRoute } from "./routes"

const app: Application = express()

app.use(bodyParser.json())

app.use("/dataElementDefinition", dataElementDefinitionRoute)

app.listen(8080, "0.0.0.0", async () => {
    console.log("starting")
    await runInitTasks()
    console.log("ready to listen")
})