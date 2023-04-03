import Router from 'preact-router'

import { DefaultLayout } from './pages/layout'
import { handleUrl, navs } from './pages/routes'
import { NotifyProvider } from './utils/notify'

export const App = () => {
	console.log('%cApp render ...', 'color: red; background-color: yellow')
	return (
		<NotifyProvider>
			<DefaultLayout>
				<Router onChange={e => handleUrl(e)}>
					{navs.map(page => page.element)}
				</Router>
			</DefaultLayout>
		</NotifyProvider>
	)
}
