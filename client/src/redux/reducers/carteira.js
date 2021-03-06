import { carteiraActions } from "../actions";
// import ValidateFormObject from '../utils/ValidateFormObject'

const {
  FETCH_CARTEIRA,
  FETCHING_CARTEIRA,
  FETCH_CARTEIRA_ERROR,
  FETCH_CARTEIRAS,
  FETCHING_CARTEIRAS,
  FETCH_CARTEIRAS_ERROR,
  CHANGE_PAGE,
  OPEN_MODAL,
  CLOSE_MODAL,
  CHANGE_CARTEIRA,
  DELETE_CARTEIRA,
  ADD_CARTEIRA,
  EDIT_CARTEIRA,
  FORM_TOUCHED,
  NEW_FORM_CARTEIRA,
  CARTEIRA_FORM_ERROR,
  CHANGE_PER_PAGE,
  CHANGE_ORDER_COLUMN,
  CHANGE_ORDER_DIRECTION,
  RESET_STATE,
  CHANGE_CARTEIRA_TERM,
  CHANGE_STATUS
} = carteiraActions;

const initialState = {
  loadingCarteira: false,
  loadingCarteiras: false,
  fetchCarteiraError: false,
  fetchCarteirasError: false,
  buscaTerm: '',
  carteiras: [],
  order: {
    column: "nome",
    direction: 1,
  },
  carteira: {
    id: "",
    ca_usu_codigo: "",
    ca_crt_descricao: "",
    ca_crt_ativo: true,
    valor_investido: 0.0,
    valor_atual: 0.0,
  },
  subjectFormErrors: {},
  subjectFormTouched: false,
  modalOpen: false,
  status: false
};

const carteira = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_CARTEIRA:
      return {
        ...state,
        carteira: action.carteira,
        loadingCarteira: false,
        fetchCarteiraError: false,
        carteiraFormTouched: false
      };
    case FETCHING_CARTEIRAS:
      return {
        ...state,
        loadingCarteiras: true,
        fetchCarteiraError: false,
      };
    case FETCHING_CARTEIRA:
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
    case FETCH_CARTEIRAS:
      return {
        ...state,
        loadingCarteiras: false,
        carteiras: action.carteiras,
        fetchCarteirasError: false,
        // order: action.order
      };
    case FETCH_CARTEIRA_ERROR:
      return {
        ...state,
        loadingCarteira: false,
        carteira: { ...initialState.carteira },
        fetchCarteiraError: action.error,
      };
    case FETCH_CARTEIRAS_ERROR:
      return {
        ...state,
        loadingCarteira: false,
        fetchCarteiraError: action.error,
        loadingCarteiras: false,
      };
    case CHANGE_CARTEIRA:
      return {
        ...state,
        carteira: action.carteira
      };
    case CHANGE_CARTEIRA_TERM:
      return {
        ...state,
        buscaTerm: action.term
      };
    case CARTEIRA_FORM_ERROR:
      const formErrors = {};
      // formSchemaType = state.subject._id ? 'edit' : 'add'
      // formErrors[action.field] = { valid: false, errorMessage: action.message }
      return {
        ...state,
      };
    case NEW_FORM_CARTEIRA:
      return {
        ...state,
        carteira: { ...initialState.carteira }
      };
    case DELETE_CARTEIRA:
      return {
        ...state,
        status: true
      };
    case ADD_CARTEIRA:
      return {
        ...state,
        status: true,
        modalOpen: false
      };
    case EDIT_CARTEIRA:
      return {
        ...state,
        status: true,
        modalOpen: false
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
        status: true
      };
    case CHANGE_STATUS:
      return {
        ...state,
        status: true,
      };
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
};

export default carteira;
