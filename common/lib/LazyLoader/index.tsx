// taken from https://webpack.js.org/guides/lazy-load-react/
import * as React from 'react'
import * as path from 'path'
import { connect } from 'react-redux'

import { renderToString } from 'react-dom/server'

import lazyAction from '../../actions/lazy-loader'

export interface OwnProps {
    serverModule: string

    clientModule: () => Promise<any>
    renderComponent: (LazyLoaded: string) => JSX.Element
}

export interface State {
}

export interface DispatchProps {
    lazyAction: (key: string, html: string) => void
}

export type Props = OwnProps & DispatchProps

class LazilyLoad extends React.Component<Props, State> {

    debugRefServer = (component: any) => console.log(component)

    renderComponent = () => {
        const resolvedPath = path.resolve(process.cwd(), this.props.serverModule)
        const module = require(resolvedPath).default

        const output = renderToString(this.props.renderComponent(module))

        this.props.lazyAction(this.props.serverModule, output)

        return (
            <div dangerouslySetInnerHTML={{
                __html: output,
            }} />
        )
    }

    render() {

        return this.renderComponent()
    }
}

const wrappedLazilyLoad = connect<{}, {}, OwnProps>(
    undefined,
    {
        lazyAction,
    },
)(LazilyLoad)

export default wrappedLazilyLoad
