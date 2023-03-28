import { Schema, model } from "mongoose"

export const taskDefinitionSchema = new Schema({
    id: String,
    name: String,
    code: String,
    mode: {
        type: String,
        enum: ["AUTO", "MANUAL"],
        default: "MANUAL"
    },
    attributeDefinitions: [
        {
            id: String,
            code: String,
            name: String,
            _type: {
                type: String,
                enum: ["SCALAR", "DATA_ELEMENT"]
            },
            target: String
        }
    ]
})

export const TaskDefinitionColl = model("TaskDefinition", taskDefinitionSchema)