// based on https://webpack.js.org/guides/lazy-load-react/
import * as React from 'react'
import { connect } from 'react-redux'

interface System {
    import<T>(request: any): Promise<T>
}
declare var System: System

export interface OwnProps {
    serverModule: string
    clientModule: () => Promise<any>
    renderComponent: (LazyLoaded: string) => JSX.Element
}

export interface State {
    isLoaded: boolean
    loadedComponent?: any
}

export interface MappedProps {
    preRendered: string
}

export type Props = OwnProps & MappedProps

class LazilyLoad extends React.Component<Props, State> {
    state: State = {
        isLoaded: false,
    }

    _isMounted: boolean = false

    componentDidMount() {
        this._isMounted = true

        this.load()
    }

    componentDidUpdate(previousProps: Props) {
        const shouldLoad = this.props.serverModule !== previousProps.serverModule

        if (shouldLoad) {
            this.load()
        }
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    load() {
        this.setState({
            isLoaded: false,
        })

        this.props.clientModule()
            .then(result => {
                if (!this._isMounted) {
                    return null
                }

                return this.setState({
                    loadedComponent: result,
                    isLoaded: true,
                })
            })
    }

    render() {
        if (!this.state.isLoaded) {
            if (this.props.preRendered) {
                return (
                    <div dangerouslySetInnerHTML={{__html: this.props.preRendered}} />
                )
            }

            return null
        }

        return this.props.renderComponent(this.state.loadedComponent)
    }
}

const wrappedLazilyLoad = connect<{}, {}, OwnProps>(
    (state, props) => {
        if (!props) {
            return {}
        }

        return {
            preRendered: state[props.serverModule],
        }
    },
)(LazilyLoad)

export default wrappedLazilyLoad
