import * as types from './types'

export const addOverlay = key => dispatch => {
    dispatch({ type: types.ADD_OVERLAY, key })
}

export const dismissOverlay = key => dispatch => {
    dispatch({ type: types.DISMISS_OVERLAY, key })
}