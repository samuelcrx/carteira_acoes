import { carteiraItensActions } from "../actions";
// import ValidateFormObject from '../utils/ValidateFormObject'

const {
  FETCH_ITEM,
  FETCHING_ITEM,
  FETCH_ITEM_ERROR,
  FETCH_ITENS,
  FETCHING_ITENS,
  FETCH_ITENS_ERROR,
  CHANGE_PAGE,
  OPEN_MODAL,
  CLOSE_MODAL,
  CHANGE_ITEM,
  DELETE_ITEM,
  ADD_ITEM,
  EDIT_ITEM,
  FORM_TOUCHED,
  NEW_FORM_ITEM,
  ITEM_FORM_ERROR,
  CHANGE_PER_PAGE,
  CHANGE_ORDER_COLUMN,
  CHANGE_ORDER_DIRECTION,
  RESET_STATE,
} = carteiraItensActions;

const initialState = {
  loadingCarteira: false,
  loadingCarteiras: false,
  fetchCarteiraError: false,
  fetchCarteirasError: false,
  carteiras: [],
  order: {
    column: "nome",
    direction: 1,
  },
  item: {
    ca_crt_codigo: '',
    ca_aco_codigo: '',
    ca_cri_quantidade: '',
    ca_cri_valor_medio: '',
    acao_id: '',
    carteira_id: ''
  },
  subjectFormErrors: {},
  subjectFormTouched: false,
  modalOpen: false,
};

// const carteiraschema = {
//   add: {
//     nome: {
//       unique: true,
//       required: true,
//       minValue: 3
//     },
//     key: {
//       unique: true
//     }
//   },
//   edit: {
//     nome: {
//       unique: true,
//       required: true,
//       minValue: 3
//     },
//     key: {
//       unique: true
//     }
//   }
// }

// const SubjectValidate = new ValidateFormObject(carteiraschema)

const carteira = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_ITEM:
      let formSchemaType = (action.carteira || {})._id ? "edit" : "add";
      return {
        ...state,
        carteira: action.carteira,
        loadingCarteira: false,
        fetchCarteiraError: false,
        carteiraFormTouched: false,
        // carteiraFormErrors: CarteiraValidate.validate({
        //   formObject: action.subject,
        //   formSchemaType
        // })
      };
    case FETCHING_ITENS:
      return {
        ...state,
        loadingCarteiras: true,
        fetchCarteiraError: false,
      };
    case FETCHING_ITEM:
      return {
        ...state,
        loadingCarteira: true,
        fetchCarteiraError: false,
      };
    case CHANGE_ORDER_COLUMN:
      return {
        ...state,
        order: {
          direction: 1,
          column: action.column,
        },
      };
    case CHANGE_ORDER_DIRECTION:
      return {
        ...state,
        order: {
          ...state.order,
          direction: action.direction,
        },
      };
    case CHANGE_PAGE:
      return {
        ...state,
        carteirasPagination: {
          ...state.carteirasPagination,
          page: action.page,
        },
      };
    case CHANGE_PER_PAGE:
      return {
        ...state,
        carteirasPagination: {
          ...state.carteirasPagination,
          rowsPerPage: action.perPage,
        },
      };
    case FETCH_ITENS:
      return {
        ...state,
        loadingCarteiras: false,
        carteiras: action.carteiras,
        fetchCarteirasError: false,
        // order: action.order
      };
    case FETCH_ITEM_ERROR:
      return {
        ...state,
        loadingCarteira: false,
        carteira: { ...initialState.carteira },
        fetchCarteiraError: action.error,
      };
    case FETCH_ITENS_ERROR:
      return {
        ...state,
        loadingCarteira: false,
        fetchCarteiraError: action.error,
        loadingCarteiras: false,
      };
    case CHANGE_ITEM:
      // formSchemaType = action.subject._id ? 'edit' : 'add'
      return {
        ...state,
        carteira: action.carteira,

        // subjectFormErrors: SubjectValidate.validate({
        //   formObject: action.subject,
        //   formSchemaType
        // })
      };
    case ITEM_FORM_ERROR:
      const formErrors = {};
      // formSchemaType = state.subject._id ? 'edit' : 'add'
      // formErrors[action.field] = { valid: false, errorMessage: action.message }
      return {
        ...state,
        // subjectFormErrors: SubjectValidate.validate({
        //   formObject: state.subject,
        //   invalidFields: formErrors,
        //   formSchemaType
        // })
      };
    case NEW_FORM_ITEM:
      return {
        ...state,
        carteira: { ...initialState.carteira },
        // carteiraFormErrors: SubjectValidate.validate({}),
        // subjectFormTouched: false
      };
    case DELETE_ITEM:
      return {
        ...state,
        loadingCarteiras: false,
        fetchCarteiraError: false,
        carteiras: state.carteiras.map((carteira) => {
          if (carteira.id === (action.carteira || {})._id) {
            return action.carteira;
          }
          return carteira;
        }),
      };
    case ADD_ITEM:
      return {
        ...state,
        loadingCarteiras: false,
        fetchCarteiraError: false,
        loadingCarteira: false,
        carteiras: [...state.carteiras, action.carteira],
      };
    case EDIT_ITEM:
      return {
        ...state,
        carteiras: state.carteiras.map((carteira) => {
          if (carteira.id === action.carteira.id) {
            return action.carteira;
          }
          return carteira;
        }),
        loadingCarteiras: false,
        fetchCarteiraError: false,
        loadingCarteira: false,
        fetchCarteirasError: false,
      };
    case FORM_TOUCHED:
      return {
        ...state,
        subjectFormTouched: true,
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
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
};

export default carteira;
