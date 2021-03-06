import { userActions, authActions } from "../actions";
// import ValidateFormObject, { validates } from '../utils/ValidateFormObject'
const {
  FETCH_USER,
  OPEN_MODAL_PASS,
  CLOSE_MODAL_PASS,
  OPEN_MODAL_SENHA,
  CLOSE_MODAL_SENHA,
  CHANGE_USER,
  CHANGE_PASS,
  ADD_USER,
  // EDIT_USER,
  // RESET_STATE
} = userActions;

const { RECORD_USER, AUTH_LOGOUT } = authActions;

const initialState = {
  loadingUser: false,
  loadingUsers: false,
  fetchUserError: false,
  fetchUsersError: false,
  users: [],
  user: {
    ca_usu_nome: "",
    ca_usu_login: "",
    reset_password: false,
    ca_usu_cripto: "",
    id: null,
  },
  userFormErrors: {},
  userFormTouched: false,
  modalOpenSenha: false,
  modalOpenPass: false,
  updatePasswordForm: {
    oldPassword: "",
    newPassword: "",
  },
  newPass: "",
};
const user = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_USER:
      return {
        ...state,
        user: action.user,
      };
    case CHANGE_PASS:
      return {
        ...state,
        newPass: action.user,
      };
    case OPEN_MODAL_PASS:
      return {
        ...state,
        modalOpenPass: true,
      };
    case CLOSE_MODAL_PASS:
      return {
        ...state,
        modalOpenPass: false,
      };
    case OPEN_MODAL_SENHA:
      return {
        ...state,
        modalOpenSenha: true,
      };
    case CLOSE_MODAL_SENHA:
      return {
        ...state,
        modalOpenSenha: false,
      };
    case AUTH_LOGOUT:
      return {
        ...initialState,
      };
    case FETCH_USER:
      return {
        ...state,
        user: action.user,
        loadingUser: false,
        fetchUserError: false,
        userFormTouched: false,
      };
    case RECORD_USER:
      return {
        ...state,
        user: action.user,
      };
    case ADD_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export default user;
