import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { App } from '../../common/App'

import lazyLoader from '../../common/reducers/lazy-loader'

export const serverRender = (location: string) => {
    const context = {}

    const preloadedState = {}

    const store = createStore(lazyLoader, preloadedState)

    const html = renderToString((
        <StaticRouter
            location={location}
            context={context}
        >
            <Provider store={store}>
                <App />
            </Provider>
        </StaticRouter>
    ))

    const finalState = store.getState()

    return {
        html,
        state: JSON.stringify(finalState),
    }
}
