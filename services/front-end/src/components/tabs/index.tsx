import { Link } from 'preact-router/match'

import './index.scss'

export function Tabs({ tabs }: { tabs: { href: string; label: string }[] }) {
	return (
		<div class="tabs">
			{tabs.map(t => (
				<Link
					class="tabs__item label"
					activeClassName="tabs__item-active"
					href={t.href}
				>
					{t.label}
				</Link>
			))}
		</div>
	)
}
