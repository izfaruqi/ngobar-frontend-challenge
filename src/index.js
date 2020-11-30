import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './state/store'
import App from './components/App'
import 'semantic-ui-css/semantic.min.css'

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)