import * as API from '../../api'
export const FETCH_LANCAMENTO = 'FETCH_LANCAMENTO'
export const FETCHING_LANCAMENTO = 'FETCHING_LANCAMENTO'
export const FETCH_LANCAMENTO_ERROR = 'FETCH_LANCAMENTO_ERROR'
export const FETCH_LANCAMENTOS = 'FETCH_LANCAMENTOS'
export const FETCHING_LANCAMENTOS = 'FETCHING_LANCAMENTOS'
export const FETCH_LANCAMENTOS_ERROR = 'FETCH_LANCAMENTOS_ERROR'
export const OPEN_MODAL = 'OPEN_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'
export const CHANGE_LANCAMENTO = 'CHANGE_LANCAMENTO'
export const CHANGE_LANCAMENTO_TERM = 'CHANGE_LANCAMENTO_TERM'
export const DELETE_LANCAMENTO = 'DELETE_LANCAMENTO'
export const ADD_LANCAMENTO = 'ADD_LANCAMENTO'
export const EDIT_LANCAMENTO = 'EDIT_LANCAMENTO'
export const FORM_TOUCHED = 'FORM_TOUCHED'
export const NEW_FORM_LANCAMENTO = 'NEW_FORM_LANCAMENTO'
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

export const handleChangeLancamento = lancamento => {
  return dispatch => {
    dispatch({ type: CHANGE_LANCAMENTO, lancamento })
  }
}
export const handleChangeLancamentoTerm = term => {
  return dispatch => {
    dispatch({ type: CHANGE_LANCAMENTO_TERM, term })
  }
}

export const handleLancamentoError = (res, dispatch) => {
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

export const newFormLancamento = () => {
  return dispatch => {
    dispatch({ type: NEW_FORM_LANCAMENTO })
  }
}

export const setLancamentoFormTouched = () => {
  return dispatch => {
    dispatch({ type: FORM_TOUCHED })
  }
}


export const deleteLancamento = id => {
  return dispatch => {
    return API.lancamentos
      .deleteLancamento(id)
      .then(({ data: lancamento }) => {
        dispatch({ type: DELETE_LANCAMENTO })
      })
      .catch(err => {
        const { response = {} } = err
        const { data = {} } = response
        const { message } = data
        dispatch({
          type: FETCH_LANCAMENTO_ERROR,
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

export const fetchLancamentos = (carteiraId, acaoCodigo, term) => {
  return dispatch => {
    dispatch({ type: FETCHING_LANCAMENTOS })
    return API.lancamentos
      .getLancamentos(carteiraId, acaoCodigo, term)
      .then((res = {}) => {
        dispatch({
          type: FETCH_LANCAMENTOS,
          lancamentos: res
        })
      })
      .catch(err => {
        const { response = {} } = err
        const { data = {} } = response
        const { message } = data
        dispatch({
          type: FETCH_LANCAMENTOS_ERROR,
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

export const addLancamento = (lancamento) => {
  return dispatch => {
    return API.lancamentos
      .addLancamento(lancamento)
      .then((data) => {
        dispatch({ type: ADD_LANCAMENTO })
        return data
      })
      .catch(err => {
        const { response = {} } = err
        const { data = {} } = response
        const { message } = data
        handleLancamentoError(response, dispatch)
        dispatch({
          type: FETCH_LANCAMENTOS_ERROR,
          err: message || 'Serviço indisponível'
        })
        return Promise.reject(err)
      })
  }
}

export const editLancamento = lancamento => {
  return dispatch => {
    return API.lancamentos
      .editLancamento(lancamento)
      .then(({ data }) => {
        dispatch({ type: ADD_LANCAMENTO })
        dispatch({ type: EDIT_LANCAMENTO })
      })
      .catch(err => {
        const { response = {} } = err
        const { data = {} } = response
        const { message } = data
        dispatch({
          type: FETCH_LANCAMENTOS_ERROR,
          err: message || 'Serviço indisponível'
        })
        handleLancamentoError(response, dispatch)
        return Promise.reject(response)
      })
  }
}

export const fetchLancamento = id => {
  return dispatch => {
    // dispatch({ type: FETCHING_LANCAMENTO, clear: true })
    dispatch({ type: OPEN_MODAL })
    return API.lancamentos
      .getLancamento(id)
      .then(({ data }) => {
        dispatch({ type: FETCH_LANCAMENTO, lancamento: data })
      })
      .catch(err => {
        const { response = {} } = err
        const { data = {} } = response
        const { message } = data
        dispatch({
          type: FETCH_LANCAMENTO_ERROR,
          err: message || 'Serviço indisponível'
        })
        return Promise.reject(err)
      })
  }
}