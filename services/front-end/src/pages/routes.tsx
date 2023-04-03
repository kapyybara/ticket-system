import { signal } from '@preact/signals'
import Router from 'preact-router'
import { DefaultLayout } from './layout'
import { Home } from './home.page'
import { MasterData } from './master-data.page'

export const _url = signal('')

export const handleUrl = (e: { url: string }) => {
	_url.value = e.url
}

export const navs = [
	{
		icon: <span class="material-symbols-rounded">home</span>,
		href: '/home',
		label: 'Home',
		element: <Home path="/home" default />,
	},
	{
		icon: <span class="material-symbols-rounded">grid_view</span>,
		href: '/master-data',
		label: 'Master Data',
		element: <MasterData path="/master-data/:rest*" />,
	},
	{
		icon: <span class="material-symbols-rounded">task_alt</span>,
		href: '/task',
		label: 'Task',
	},
	{
		icon: <span class="material-symbols-rounded">account_tree</span>,
		href: '/ticket',
		label: 'Ticket',
	},
	{
		icon: <span class="material-symbols-rounded">badge</span>,
		href: '/agent-group',
		label: 'Agent group',
	},
]
