import { authActions } from '../actions'

const {
  AUTH_LOGIN,
  // AUTH_LOGOUT,
  AUTH_ERROR,
  LOADING_LOGIN,
  // CHANGE_NEXT_PATH,
  // CLEAR_NEXT_PATH,
  // AUTH_LOADING,
  // CLEAR_REFRESH_TOKEN
} = authActions

const initialState = {
  loading: false,
  token: '',
  err: null
}

const auth = (state = initialState, action = {}) => {
  switch (action.type) {
    case AUTH_LOGIN:
      return {
        ...state,
        loading: false,
        err: null,
        token: action.token
      }
    // case AUTH_LOGOUT:
    //   return { ...initialState }
    // case CLEAR_REFRESH_TOKEN:
    //   return {
    //     ...state,
    //     refreshToken: false
    //   }
    case LOADING_LOGIN:
      return {
        ...state,
        err: null,
        loading: true
      }
    // case CHANGE_NEXT_PATH:
    //   return {
    //     ...state,
    //     nextPath: action.path
    //   }
    // case CLEAR_NEXT_PATH:
    //   return {
    //     ...state,
    //     nextPath: ''
    //   }
    case AUTH_ERROR:
      return {
        ...state,
        err: action.err,
        loading: false
      }
    // case AUTH_LOADING:
    //   return {
    //     ...state,
    //     loading: action.loading
    //   }
    default:
      return state
  }
}

export default auth