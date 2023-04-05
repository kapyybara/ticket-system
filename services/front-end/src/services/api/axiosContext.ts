import axios from 'axios'
import queryString from 'query-string'

type Request = {
	url?: string
	method?: any
	body?: any
	params?: Record<string, any>
}

export default async function request(req: Request) {
	const baseURL = 'http://localhost:8080'
	//		process.env.REACT_APP_API_URL
	const headers = {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
	}
	const queryFormarted = req.params ? queryString.stringify(req.params) : ''

	let objMeta = {
		method: req.method || 'GET',
		url: `${baseURL}/${req.url}${`/?${queryFormarted}` || ''}`,
		headers,
		data: req.body,
	}

	return await axios(objMeta)
}
