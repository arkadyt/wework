import * as types from '../actions/types'

const initialState = {}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.DISMISS_OVERLAY:
            const { [action.key]: _, ...rest } = state;
            return rest
        case types.ADD_OVERLAY:
            return {
                ...state,
                [action.key]: true
            }
        default:
            return state
    }
}