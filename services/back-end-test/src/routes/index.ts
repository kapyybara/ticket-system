import { Router } from 'express'
import { masterDataDefRoute } from './masterdatadef.route'

export const router: Router = Router()
router.use('/master-data-def', masterDataDefRoute)
