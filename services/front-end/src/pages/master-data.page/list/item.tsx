import clx from 'classnames'

import { MasterDataDef } from '@ithan/core'

import $ from './index.module.scss'

export const Item = (props: {
	data: MasterDataDef
	onSelect: (id: MasterDataDef['id']) => void
}) => {
	const { data, onSelect } = props
	return (
		<div class={$.item} onClick={() => onSelect(data.id)}>
			<span class="label">{data.name}</span>
			<span class={clx('caption', $.item__des)}>{data.description}</span>
			<div class={$.item__footer}>
				<span class="caption">By Nhat Tien</span>
				<span class="caption">2 day ago</span>
			</div>
		</div>
	)
}
