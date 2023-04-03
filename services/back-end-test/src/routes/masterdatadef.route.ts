import { Router } from 'express'

import * as handler from '../handlers/masterdatadef.handler'

export const masterDataDefRoute: Router = Router({ mergeParams: true })

masterDataDefRoute.post('/', handler.create)
