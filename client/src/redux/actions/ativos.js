import * as API from '../../api'
export const FETCH_ITEM = 'FETCH_ITEM'
export const FETCHING_ITEM = 'FETCHING_ITEM'
export const FETCH_ITEM_ERROR = 'FETCH_ITEM_ERROR'
export const FETCH_ITENS = 'FETCH_ITENS'
export const FETCHING_ITENS = 'FETCHING_ITENS'
export const FETCH_ITENS_ERROR = 'FETCH_ITENS_ERROR'
export const OPEN_MODAL = 'OPEN_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'
export const CHANGE_ITEM = 'CHANGE_ITEM'
export const DELETE_ITEM = 'DELETE_ITEM'
export const ADD_ITEM = 'ADD_ITEM'
export const EDIT_ITEM = 'EDIT_ITEM'
export const FORM_TOUCHED = 'FORM_TOUCHED'
export const NEW_FORM_ITEM = 'NEW_FORM_ITEM'
export const ITEM_FORM_ERROR = 'ITEM_FORM_ERROR'
export const CHANGE_PAGE = 'CHANGE_PAGE'
export const CHANGE_PER_PAGE = 'CHANGE_PER_PAGE'
export const CHANGE_ORDER_COLUMN = 'CHANGE_ORDER_COLUMN'
export const CHANGE_ORDER_DIRECTION = 'CHANGE_ORDER_DIRECTION'
export const RESET_STATE = 'RESET_STATE'

export const openModal = () => {
  return dispatch => {
    dispatch({ type: OPEN_MODAL })
  }
}

export const handleChangeItem = item => {
  return dispatch => {
    dispatch({ type: CHANGE_ITEM, item })
  }
}

export const handleItemError = (res, dispatch) => {
  const { data: errorMessage = '' } = res

  switch (true) {
    case errorMessage.includes('duplicate key error'):
      dispatch({
        type: FORM_TOUCHED
      })
      dispatch({
        type: ITEM_FORM_ERROR,
        field: 'key',
        message: `Carteira já cadastrada.`
      })
      return Promise.reject(res)

    default:
      break
  }
}

export const newFormItem = () => {
  return dispatch => {
    dispatch({ type: NEW_FORM_ITEM })
  }
}

export const setItemFormTouched = () => {
  return dispatch => {
    dispatch({ type: FORM_TOUCHED })
  }
}


export const deleteItem = id => {
  return dispatch => {
    dispatch({ type: FETCHING_ITENS })
    return API.itens
      .deleteItem(id)
      .then(({ data: item }) => {
        dispatch({ type: DELETE_ITEM, item })
      })
      .catch(err => {
        const { response = {} } = err
        const { data = {} } = response
        const { message } = data
        dispatch({
          type: FETCH_ITEM_ERROR,
          err: message || 'Serviço indisponível'
        })
        return Promise.reject(err)
      })
  }
}

export const changeOrderColumn = column => {
  return dispatch => {
    dispatch({ type: CHANGE_ORDER_COLUMN, column })
  }
}

export const changeOrderDirection = direction => {
  return dispatch => {
    dispatch({ type: CHANGE_ORDER_DIRECTION, direction })
  }
}

export const fetchItens = (carteiraId) => {
  return dispatch => {
    dispatch({ type: FETCHING_ITENS })
    return API.itens
      .getItens(carteiraId)
      .then((res = {}) => {
        dispatch({
          type: FETCH_ITENS,
          itens: res
        })
      })
      .catch(err => {
        const { response = {} } = err
        const { data = {} } = response
        const { message } = data
        dispatch({
          type: FETCH_ITENS_ERROR,
          err: message || 'Serviço indisponível'
        })
        return Promise.reject(err)
      })
  }
}

export const closeModal = () => {
  return dispatch => {
    dispatch({ type: CLOSE_MODAL })
  }
}

export const resetState = () => {
  return dispatch => {
    dispatch({ type: RESET_STATE })
  }
}

export const addItem = (item) => {
  return dispatch => {
    dispatch({ type: FETCHING_ITENS })
    dispatch({ type: FETCHING_ITEM })
    return API.itens
      .addItem(item)
      .then(({ data }) => {
        dispatch({ type: ADD_ITEM, item: data })
      })
      .catch(err => {
        const { response = {} } = err
        const { data = {} } = response
        const { message } = data
        handleItemError(response, dispatch)
        dispatch({
          type: FETCH_ITENS_ERROR,
          err: message || 'Serviço indisponível'
        })
        return Promise.reject(err)
      })
  }
}

export const editItem = item => {
  return dispatch => {
    dispatch({ type: FETCHING_ITENS })
    dispatch({ type: FETCHING_ITEM })
    return API.itens
      .editItem(item)
      .then(({ data }) => {
        dispatch({ type: EDIT_ITEM, item: data })
      })
      .catch(err => {
        const { response = {} } = err
        const { data = {} } = response
        const { message } = data
        dispatch({
          type: FETCH_ITENS_ERROR,
          err: message || 'Serviço indisponível'
        })
        handleItemError(response, dispatch)
        return Promise.reject(response)
      })
  }
}

export const fetchItem = id => {
  return dispatch => {
    dispatch({ type: FETCHING_ITEM, clear: true })
    dispatch({ type: OPEN_MODAL })
    return API.carteira
      .getCarteira(id)
      .then(({ data }) => {
        dispatch({ type: FETCH_ITEM, carteira: data })
      })
      .catch(err => {
        const { response = {} } = err
        const { data = {} } = response
        const { message } = data
        dispatch({
          type: FETCH_ITEM_ERROR,
          err: message || 'Serviço indisponível'
        })
        return Promise.reject(err)
      })
  }
}