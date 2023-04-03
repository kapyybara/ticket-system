import { PrismaClient } from '@prisma/client'

export const db = new PrismaClient({})

export * as MasterDataDefDB from './masterDataDef.db'
