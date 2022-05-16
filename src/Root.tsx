import 'modern-css-reset'
import 'primereact/resources/themes/lara-light-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import './global.css'

import { render } from 'react-dom'
import { App } from './App'

const rootNode = document.getElementById('root')

render(<App />, rootNode)
