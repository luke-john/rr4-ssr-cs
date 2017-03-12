export interface LazyAction {
    type: 'render-component'
    payload: {
        [key: string]: string,
    }
}

const defaultState: {
    [key: string]: string,
} = {}

export default (state = defaultState, action: LazyAction) => {
    switch (action.type) {
        case 'render-component':
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}
