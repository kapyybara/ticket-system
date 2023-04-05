import { Link } from 'preact-router/match'

import './index.scss'

export function Tabs({ children }: { children: any }) {
	return <div class="tabs">{children}</div>
}

export { Tab } from './tab'
