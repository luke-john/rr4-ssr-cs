import { LazyAction } from '../reducers/lazy-loader'

const lazyAction = (key: string, value: string): LazyAction => {
    return {
        type: 'render-component',
        payload: {
            [key]: value,
        },
    }
}

export default lazyAction
