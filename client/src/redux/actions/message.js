export const CHANGE_MESSAGE = 'CHANGE_MESSAGE'
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE'

export const changeMessage = ({ message, messageDuration, anchorOrigin }) => {
  return dispatch => {
    dispatch({ type: CHANGE_MESSAGE, message, messageDuration, anchorOrigin })
  }
}

export const clearMessage = () => {
  return dispatch => {
    dispatch({ type: CLEAR_MESSAGE })
  }
}