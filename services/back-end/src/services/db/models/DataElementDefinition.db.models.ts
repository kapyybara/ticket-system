import { Schema, model } from "mongoose"

const dataElementDefinitionSchema = new Schema({
    name: String,
    code: String,
    displayAttributes: [String],
    attributeDefinitions: [
        {
            id: String,
            code: String,
            name: String,
            type: {
                type: String,
                enum: ["SCALAR", "DATA_ELEMENT"]
            },
            target: String
        }
    ]
})

export const DataElementDefinitionRecord = model("DataElementDefinition", dataElementDefinitionSchema)