import axios from 'axios'
import queryString from 'query-string'

export default async function request(
	url: any,
	method: any,
	body: any,
	params: Record<string, any>,
) {
	const baseURL = 'http://localhost:3000'
	//		process.env.REACT_APP_API_URL
	const headers = {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
	}
	const queryFormarted = queryString.stringify(params)
	console.log(`${baseURL}/api${url}${`/?${queryFormarted}` || ''}`)
	let objMeta = {
		method,
		url: `${baseURL}/api${url}${`/?${queryFormarted}` || ''}`,
		headers,
		data: body,
	}

	return await axios(objMeta)
}
