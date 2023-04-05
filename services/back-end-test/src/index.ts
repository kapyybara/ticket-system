import bodyParser from 'body-parser'
import express, { Application, Request, Response } from 'express'
import cors from 'cors'

import { InitTasks } from './init'

import { masterDataDefRoute } from './routes/masterdatadef.route'
import { router } from './routes'

const app: Application = express()

var whitelist =
	process.env.NODE_ENV === 'production'
		? ['http://127.0.0.1:5173', 'http://example2.com']
		: '*'
var corsOptions = {
	origin: whitelist,
}

app.use(cors(corsOptions))
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
