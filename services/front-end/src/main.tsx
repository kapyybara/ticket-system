import { render } from 'preact'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import './index.css'
import './assets/styles/typography.css'
import './assets/styles/reset.css'
import './assets/styles/ag-grid.scss'
import { App } from './app'

render(<App />, document.getElementById('app') as HTMLElement)
