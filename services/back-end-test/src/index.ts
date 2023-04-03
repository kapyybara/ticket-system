import { InitTasks } from './init'
import bodyParser from 'body-parser'
import express, { Application, Request, Response } from 'express'
import { masterDataDefRoute } from './routes/masterdatadef.route'
import { router } from './routes'

const app: Application = express()

app.use(bodyParser.json())

app.use(router)

app.get('/', (req: Request, res: Response) => {
	res.send('Hello')
})

app.listen(8080, '0.0.0.0', async () => {
	console.log('starting')
	await InitTasks()
	console.log('🚀 ready to listen in  http://localhost::8080')
})
