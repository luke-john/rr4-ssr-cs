import * as React from 'react'
import { Route, Switch } from 'react-router'
import { Link } from 'react-router-dom'

import { LazyPage } from './LazyPage'

export class App extends React.Component<{}, {}> {
    render() {
        return (
            <Switch>
                <Route
                    exact
                    path="/"
                    render={(_: any) => (
                        <Link to="/lazy">Lazy loaded page</Link>
                    )}
                />
                <Route
                    path="/lazy"
                    render={(_: any) => (
                        <div>
                            <p>The following is lazy loaded</p>
                            <LazyPage />
                        </div>
                    )}
                />
            </Switch>
        )
    }
}
