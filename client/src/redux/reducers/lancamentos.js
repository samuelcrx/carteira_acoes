import { lancamentosActions } from "../actions";
// import ValidateFormObject from '../utils/ValidateFormObject'

const {
  FETCH_LANCAMENTO,
  FETCHING_LANCAMENTO,
  FETCH_LANCAMENTO_ERROR,
  FETCH_LANCAMENTOS,
  FETCHING_LANCAMENTOS,
  FETCH_LANCAMENTOS_ERROR,
  OPEN_MODAL,
  CLOSE_MODAL,
  CHANGE_LANCAMENTO,
  DELETE_LANCAMENTO,
  ADD_LANCAMENTO,
  EDIT_LANCAMENTO,
  CHANGE_LANCAMENTO_TERM,
  NEW_FORM_LANCAMENTO,
  LANCAMENTO_FORM_ERROR,
  RESET_STATE,
  REFRESH
} = lancamentosActions;

const initialState = {
  refreshAtivos: false,
  loadingLancamneto: false,
  loadingLancamentos: false,
  fetchLancamnetoError: false,
  fetchLancamentosError: false,
  lancamentos: [],
  buscaTerm: '',
  lancamento: {
    id: "",
    createdAt: "",
    ca_crm_compra_venda: "C",
    ca_aco_codigo: "",
    ca_crt_codigo: "",
    ca_crm_quantidade: 0,
    ca_crm_valor: 0,
    updatedAt: "",
    carteira_id: "",
    acao_id: "",
  },
  subjectFormErrors: {},
  subjectFormTouched: false,
  modalOpen: false,
};

const lancamentos = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_LANCAMENTO:
      return {
        ...state,
        lancamento: action.lancamento,
        loadingLancamento: false,
        fetchLancamentoError: false,
        LancamentoFormTouched: false
      };
    case FETCHING_LANCAMENTOS:
      return {
        ...state,
        loadingLancamentos: true,
        fetchLancamentoError: false,
      };
    case FETCHING_LANCAMENTO:
      return {
        ...state,
        loadingLancamento: true,
        fetchLancamentoError: false,
      };
    case FETCH_LANCAMENTOS:
      return {
        ...state,
        loadingLancamentos: false,
        lancamentos: action.lancamentos,
        fetchLancamentosError: false,
        // order: action.order
      };
    case FETCH_LANCAMENTO_ERROR:
      return {
        ...state,
        loadingLancamento: false,
        lancamento: { ...initialState.lancamento },
        fetchLancamentoError: action.error,
      };
    case FETCH_LANCAMENTOS_ERROR:
      return {
        ...state,
        loadingLancamento: false,
        fetchLancamentoError: action.error,
        loadingLancamentos: false,
      };
    case CHANGE_LANCAMENTO:
      return {
        ...state,
        lancamento: action.lancamento,
      };
    case CHANGE_LANCAMENTO_TERM:
      return {
        ...state,
        buscaTerm: action.term
      };
    case LANCAMENTO_FORM_ERROR:
      const formErrors = {};
      return {
        ...state,
      };
    case NEW_FORM_LANCAMENTO:
      return {
        ...state,
        lancamento: { ...initialState.lancamento },
      };
    case DELETE_LANCAMENTO:
      return {
        ...state,
        refreshAtivos: true
      };
    case ADD_LANCAMENTO:
      return {
        ...state,
        refreshAtivos: true
      };
    case EDIT_LANCAMENTO:
      return {
        ...state,
        refreshAtivos: true
      };
    case REFRESH:
      return {
        ...state,
        refreshAtivos: false
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

export default lancamentos;
