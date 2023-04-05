import { Router } from 'express'

import { MasterDataDefHandler as handler } from '../handlers/masterdatadef.handler'

export const masterDataDefRoute: Router = Router({ mergeParams: true })

masterDataDefRoute.get('/', handler.getItems)
masterDataDefRoute.post('/', handler.create)
