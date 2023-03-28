import { Schema, model } from "mongoose"

import { taskDefinitionSchema } from "./TaskDefnition.db.models"

const taskSchema = new Schema({
    id: String,
    name: String,
    taskDefinition: taskDefinitionSchema
})

const pipelineDefinitionSchema = new Schema({
    id: String,
    name: String,
    description: String,
    tasks: [taskSchema],
    relationships: [
        {
            id: String,
            source: taskSchema,
            outCome: {
                id: String,
                outcome: {
                    type: String,
                    enum: ["DONE", "FAIL"],
                    subOutCome: String
                }
            },
            target: taskSchema
        }
    ]
})

export const PipelineDefinitionColl = model("PipelineDefinition", pipelineDefinitionSchema)