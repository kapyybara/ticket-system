import { useMemo } from 'preact/hooks'
import Router from 'preact-router'

import './index.module.scss'
import $ from './index.module.scss'
import { MasterDataDef } from './tabs/def'
import { Tab, Tabs } from '@/components/tabs'
import { MasterDataData } from './tabs/data'
import { useMasterDataDefPageVM } from '@/viewmodels/masterDataPage.vm'
import { MasterDataDefList } from './list'
import { SearchInput } from '@/components/searchinput/index'
import { AddButton } from '@/components/form/button/add'

export function MasterData() {
	const {
		masterDataDefFormVM,
		createMasterDataDef,
		masterDataDefs,
		handleSelect,
		handleSearch,
		searchKey,
		loadMore,
		listLoading,
		readyToLoadMore,
	} = useMasterDataDefPageVM()

	return (
		<div class={$.wrap}>
			<div class={$.sidebar}>
				<div class={$.searchbar}>
					<SearchInput onSearch={handleSearch} value={searchKey} />
				</div>
				<div class={$.list}>
					<MasterDataDefList
						loadMore={loadMore}
						items={masterDataDefs}
						onSelect={handleSelect}
						loading={listLoading}
						ready={readyToLoadMore}
					/>
				</div>
				<div class={$.newbtn}>
					<AddButton onClick={createMasterDataDef}>
						Create new master data
					</AddButton>
				</div>
			</div>
			<div class={$.tab}>
				<Tabs>
					<Tab href="/master-data" label="Definition" />
					<Tab href="/master-data/data" label="Data" />
				</Tabs>
			</div>
			<div class={$.main}>
				<Router>
					<MasterDataDef path="/master-data" form={masterDataDefFormVM} />
					<MasterDataData path="/master-data/data" />
				</Router>
			</div>
		</div>
	)
}
