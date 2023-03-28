import { Link } from 'preact-router/match'
import clx from 'classnames'

import { navs, _url } from '../routes'
import './index.scss'

export const DefaultLayout = ({ children }: any) => {
	return (
		<div class="app">
			<div class="sidebar">
				{navs.map(nav => (
					<Link
						href={nav.href}
						class={clx(
							'navItem label',
							clx({ active: _url.value.includes(nav.href) }),
						)}
					>
						{nav.icon}
						{nav.label}
					</Link>
				))}
			</div>
			<div className="header">Workflow anh Ninh</div>
			<div className="main">{children}</div>
		</div>
	)
}
