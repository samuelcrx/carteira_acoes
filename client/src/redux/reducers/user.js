import { userActions, authActions } from "../actions";
// import ValidateFormObject, { validates } from '../utils/ValidateFormObject'
const {
  FETCH_USER,
  FETCHING_USER,
  // FETCH_USER_ERROR,
  // FETCH_USERS,
  // FETCHING_USERS,
  // FETCH_USERS_ERROR,
  OPEN_MODAL,
  CLOSE_MODAL,
  CHANGE_USER,
  // DELETE_USER,
  ADD_USER,
  // EDIT_USER,
  // FORM_TOUCHED,
  // NEW_FORM_USER,
  // USER_FORM_ERROR,
  // FETCH_PROFILES,
  // CHANGE_PAGE,
  // CHANGE_PER_PAGE,
  // CHANGE_ORDER_COLUMN,
  // CHANGE_ORDER_DIRECTION,
  // CHANGE_UPDATE_PASSWORD_FORM,
  // RESET_STATE
} = userActions;

const { RECORD_USER } = authActions;

const initialState = {
  loadingUser: false,
  loadingUsers: false,
  fetchUserError: false,
  fetchUsersError: false,
  users: [],
  // order: {
  //   column: 'nome',
  //   direction: 1
  // },
  user: {
    ca_usu_nome: "",
    ca_usu_login: "",
    reset_password: false,
    ca_usu_cripto: "",
    id: null,
  },
  // usersPagination: {
  //   page: 0,
  //   rowsPerPage: 50,
  //   length: 0
  // },
  userFormErrors: {},
  userFormTouched: false,
  modalOpen: false,
  updatePasswordForm: {
    oldPassword: "",
    newPassword: "",
  },
};

// const userSchema = {
//   add: {
//     nome: {
//       required: true,
//       minValue: 3
//     },
//     cpf: {
//       required: true,
//       func: validates.cpf,
//       errorMessage: 'Este campo deve conter um número de CPF válido.'
//     },
//     email: {
//       required: true,
//       func: validates.email,
//       errorMessage: 'Este campo deve conter um e-mail válido.'
//     },
//     perfil: {
//       required: true
//     }
//   },
//   edit: {
//     nome: {
//       required: true,
//       minValue: 3
//     },
//     cpf: {
//       required: true,
//       func: validates.cpf,
//       errorMessage: 'Este campo deve conter um número de CPF válido.'
//     },
//     email: {
//       required: true,
//       func: validates.email,
//       errorMessage: 'Este campo deve conter um e-mail válido.'
//     },
//     perfil: { required: true }
//   }
// }

// const UserValidate = new ValidateFormObject(userSchema)

const user = (state = initialState, action = {}) => {
  //   let formSchemaType
  switch (action.type) {
    case CHANGE_USER:
      return {
        ...state,
        user: action.user,
      };
    case OPEN_MODAL:
      return {
        ...state,
        modalOpen: true,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        modalOpen: false,
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
