import { Link } from 'preact-router/match'
import './index.scss'

export const Tab = ({ href, label }: { href: string; label: string }) => {
	return (
		<Link
			class="tabs__item label"
			activeClassName="tabs__item-active"
			href={href}
		>
			{label}
		</Link>
	)
}
