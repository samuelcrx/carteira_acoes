import { cotacoesActions } from "../actions";
// import ValidateFormObject from '../utils/ValidateFormObject'

const {
  FETCH_COTACAO,
  FETCHING_COTACAO,
  FETCH_COTACAO_ERROR,
  FETCH_COTACOES,
  FETCHING_COTACOES,
  FETCH_COTACOES_ERROR,
  OPEN_MODAL,
  CLOSE_MODAL,
  CHANGE_COTACAO,
  DELETE_COTACAO,
  ADD_COTACAO,
  EDIT_COTACAO,
  FORM_TOUCHED,
  NEW_FORM_COTACAO,
  COTACAO_FORM_ERROR,
  RESET_STATE,
} = cotacoesActions;

const initialState = {
  restartTable: false,
  fetchCotacaoError: false,
  fetchCotacoesError: false,
  cotacoes: [],
  cotacao: {
    id: "",
    ca_usu_codigo: "",
    ca_aco_codigo: "",
    ca_acc_valor: 0,
    created_at: "",
    updated_at: "",
    acao_id: ""
  },
  subjectFormErrors: {},
  subjectFormTouched: false,
  modalOpen: false,
};

const cotacao = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_COTACAO:
      return {
        ...state,
        cotacao: action.cotacao,
      };
    case FETCHING_COTACOES:
      return {
        ...state,
      };
    case FETCHING_COTACAO:
      return {
        ...state,
      };
    case FETCH_COTACOES:
      return {
        ...state,
        // loadingCarteiras: false,
        cotacoes: action.cotacoes,
        // fetchCarteirasError: false,
        // order: action.order
      };
    case FETCH_COTACAO_ERROR:
      return {
        ...state,
        loadingCarteira: false,
        carteira: { ...initialState.carteira },
        fetchCarteiraError: action.error,
      };
    case FETCH_COTACOES_ERROR:
      return {
        ...state,
        loadingCarteira: false,
        fetchCotacaoError: action.error,
        loadingCarteiras: false,
      };
    case CHANGE_COTACAO:
      return {
        ...state,
        cotacao: action.cotacao,
      };
    case COTACAO_FORM_ERROR:
      const formErrors = {};
      return {
        ...state,
      };
    case NEW_FORM_COTACAO:
      return {
        ...state,
        cotacao: { ...initialState.cotacao },
      };
    case ADD_COTACAO:
      return {
        ...state,
        restartTable: true
      };
    case EDIT_COTACAO:
      return {
        ...state,
        restartTable: true
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

export default cotacao;
