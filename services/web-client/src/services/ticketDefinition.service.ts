import { TicketDefinition } from "@ithan/core"

export const get = async (id: TicketDefinition['id']): Promise<TicketDefinition> => {
    return new TicketDefinition()
}

export const getAll = async (): Promise<TicketDefinition[]> => {
    return [new TicketDefinition()]
}

export const create = async (TicketDefinition: TicketDefinition): Promise<TicketDefinition> => {

}

export const update = async (id: TicketDefinition['id'], TicketDefinition: TicketDefinition): Promise<TicketDefinition> => {

}

export const remove = async (id: TicketDefinition['id']): Promise<boolean> => {

}