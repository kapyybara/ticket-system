import { useMemo } from 'preact/hooks'
import Router from 'preact-router'

import './index.module.scss'
import $ from './index.module.scss'
import { MasterDataDef } from './tabs/def'
import { Tabs } from '@/components/tabs'
import { MasterDataData } from './tabs/data'

export function MasterData() {
	const tabs = useMemo(
		() => [
			{
				href: '/master-data/def',
				label: 'Definition',
				element: <MasterDataDef path="/master-data/def" />,
			},
			{
				href: '/master-data/data',
				label: 'Data',
				element: <MasterDataData path="/master-data/data" />,
			},
		],
		[],
	)

	return (
		<div class={$.wrap}>
			<div class={$.list}>List</div>
			<div class={$.tab}>
				<Tabs tabs={tabs} />
			</div>
			<div class={$.main}>
				<Router>{tabs.map(t => t.element)}</Router>
			</div>
		</div>
	)
}
