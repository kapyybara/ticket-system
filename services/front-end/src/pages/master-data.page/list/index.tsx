import { MasterDataDef } from '@ithan/core'
import clx from 'classnames'
import { Item } from './item'
import $ from './index.module.scss'
import { Signal } from '@preact/signals'

export const MasterDataDefList = (props: {
	items: Signal<MasterDataDef[]>
	onSelect: (id: string) => void
	loadMore: () => void
	loading: Signal<boolean>
	ready: Signal<boolean>
}) => {
	const { items, onSelect, loadMore, loading, ready } = props
	if (loading.value) {
		return (
			<div class={clx($.nodata, $.loading)}>
				<span class="material-symbols-rounded">hourglass_top</span>
			</div>
		)
	}
	return (
		<>
			{items.value.length > 0 ? (
				<div class={$.list}>
					{items.value.map(i => (
						<Item key={i.id} data={i} onSelect={onSelect} />
					))}
					<button onClick={loadMore} disabled={!ready.value}>
						loadmore
					</button>
				</div>
			) : (
				<div class={$.nodata}>
					<span class="material-symbols-rounded">folder_off</span>
					<p>No data</p>
				</div>
			)}
		</>
	)
}
