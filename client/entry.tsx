import * as React from 'react'
import { render } from 'react-dom'

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import 'react-router'
import { BrowserRouter } from 'react-router-dom'

import { App } from '../common/App'

import lazyLoader from '../common/reducers/lazy-loader'

type __PRELOADED_STATE__ = any

declare var __PRELOADED_STATE__: __PRELOADED_STATE__

const preloadedState = JSON.parse(__PRELOADED_STATE__)

const store = createStore(
    lazyLoader,
    preloadedState,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
)

const clientApp = (
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
)

render(clientApp, document.getElementById('root'))
