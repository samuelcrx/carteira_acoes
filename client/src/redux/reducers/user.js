import { userActions } from "../actions";
// import ValidateFormObject, { validates } from '../utils/ValidateFormObject'
const {
  // FETCH_USER,
  // FETCHING_USER,
  // FETCH_USER_ERROR,
  // FETCH_USERS,
  // FETCHING_USERS,
  // FETCH_USERS_ERROR,
  // OPEN_MODAL,
  // CLOSE_MODAL,
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

const initialState = {
  // loadingUser: false,
  // loadingUsers: false,
  // fetchUserError: false,
  fetchUsersError: false,
  users: [],
  // order: {
  //   column: 'nome',
  //   direction: 1
  // },
  user: {
    ca_usu_nome: "",
    ca_usu_login: "",
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
        // userFormErrors: UserValidate.validate({
        //   formObject: action.user,
        //   formSchemaType
        // })
      };
    //     case CHANGE_UPDATE_PASSWORD_FORM:
    //       return {
    //         ...state,
    //         updatePasswordForm: action.updatePasswordForm
    //       }
    //     case USER_FORM_ERROR:
    //       const formErrors = {}
    //       formSchemaType = state.user._id ? 'edit' : 'add'
    //       formErrors[action.field] = { valid: false, errorMessage: action.message }
    //       return {
    //         ...state,
    //         userFormErrors: UserValidate.validate({
    //           formObject: state.user,
    //           invalidFields: formErrors,
    //           formSchemaType
    //         })
    //       }
    //     case NEW_FORM_USER:
    //       return {
    //         ...state,
    //         user: { ...initialState.user },
    //         userFormErrors: UserValidate.validate({}),
    //         userFormTouched: false
    //       }
    //     case FORM_TOUCHED:
    //       return {
    //         ...state,
    //         userFormTouched: true
    //       }
    //     case OPEN_MODAL:
    //       return {
    //         ...state,
    //         modalOpen: true
    //       }
    //     case CLOSE_MODAL:
    //       return {
    //         ...state,
    //         modalOpen: false
    //       }
    //     case FETCH_USER:
    //       formSchemaType = action.user._id ? 'edit' : 'add'
    //       return {
    //         ...state,
    //         user: action.user,
    //         loadingUser: false,
    //         fetchUserError: false,
    //         userFormTouched: false,
    //         userFormErrors: UserValidate.validate({
    //           formObject: action.user,
    //           formSchemaType
    //         })
    //       }
    //     case CHANGE_ORDER_COLUMN:
    //       return {
    //         ...state,
    //         order: {
    //           direction: 1,
    //           column: action.column
    //         }
    //       }
    //     case CHANGE_ORDER_DIRECTION:
    //       return {
    //         ...state,
    //         order: {
    //           ...state.order,
    //           direction: action.direction
    //         }
    //       }
    //     case FETCHING_USER:
    //       return {
    //         ...state,
    //         loadingUser: true,
    //         fetchUserError: false
    //       }
    //     case DELETE_USER:
    //       return {
    //         ...state,
    //         loadingUsers: false,
    //         fetchUserError: false,
    //         users: state.users.map(user => {
    //           if (user._id === action.user._id) {
    //             user = action.user
    //           }
    //           return user
    //         })
    //       }
    //     case FETCH_USER_ERROR:
    //       return {
    //         ...state,
    //         loadingUser: false,
    //         loadingUsers: false,
    //         fetchUserError: action.error
    //       }
    //     case CHANGE_PAGE:
    //       return {
    //         ...state,
    //         usersPagination: {
    //           ...state.usersPagination,
    //           page: action.page
    //         }
    //       }
    //     case CHANGE_PER_PAGE:
    //       return {
    //         ...state,
    //         usersPagination: {
    //           ...state.usersPagination,
    //           rowsPerPage: action.perPage
    //         }
    //       }
    //     case FETCH_USERS:
    //       return {
    //         ...state,
    //         loadingUsers: false,
    //         users: action.users,
    //         fetchUsersError: false,
    //         order: action.order,
    //         usersPagination: {
    //           length: action.length,
    //           page: action.page,
    //           rowsPerPage: action.rowsPerPage
    //         }
    //       }
    //     case EDIT_USER:
    //       return {
    //         ...state,
    //         users: state.users.map(user => {
    //           if (user._id === action.user._id) {
    //             return action.user
    //           }
    //           return user
    //         }),
    //         loadingUsers: false,
    //         loadingUser: false,
    //         fetchUsersError: false
    //       }
    //     case FETCHING_USERS:
    //       return {
    //         ...state,
    //         loadingUsers: true,
    //         fetchUsersError: false
    //       }
    //     case FETCH_USERS_ERROR:
    //       return {
    //         ...state,
    //         loadingUsers: false,
    //         loadingUser: false,
    //         fetchUsersError: action.error
    //       }
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
