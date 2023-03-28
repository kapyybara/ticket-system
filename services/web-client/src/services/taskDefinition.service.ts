import { TaskDefinition } from "@ithan/core"

export const get = async (id: TaskDefinition['id']): Promise<TaskDefinition> => {
    return new TaskDefinition()
}

export const getAll = async (): Promise<TaskDefinition[]> => {
    return [new TaskDefinition()]
}

export const create = async (TaskDefinition: TaskDefinition): Promise<TaskDefinition> => {

}

export const update = async (id: TaskDefinition['id'], TaskDefinition: TaskDefinition): Promise<TaskDefinition> => {

}

export const remove = async (id: TaskDefinition['id']): Promise<boolean> => {

}