import { carteiraItensActions } from "../actions";
// import ValidateFormObject from '../utils/ValidateFormObject'

const {
  FETCH_ITEM,
  FETCHING_ITEM,
  FETCH_ITEM_ERROR,
  FETCH_ITENS,
  FETCHING_ITENS,
  FETCH_ITENS_ERROR,
  OPEN_MODAL,
  CLOSE_MODAL,
  CHANGE_ITEM,
  DELETE_ITEM,
  ADD_ITEM,
  EDIT_ITEM,
  FORM_TOUCHED,
  NEW_FORM_ITEM,
  ITEM_FORM_ERROR,
  RESET_STATE,
  CHANGE_ITEM_TERM,
  OPEN_MODAL_LEMBRETE,
  CLOSE_MODAL_LEMBRETE,
  CHANGE_STATUS,
} = carteiraItensActions;

const initialState = {
  loadingCarteira: false,
  loadingCarteiras: false,
  fetchCarteiraError: false,
  fetchCarteirasError: false,
  buscaTerm: "",
  itens: [],
  item: {
    id: "",
    ca_crt_codigo: "",
    ca_aco_codigo: "",
    ca_cri_quantidade: 0,
    ca_cri_valor_medio: "",
    acao_id: "",
    ca_cotacao: 0,
    ca_crt_min: 0,
    ca_crt_max: 0,
  },
  subjectFormErrors: {},
  subjectFormTouched: false,
  modalOpen: false,
  modalLembreteOpen: false,
  status: false,
};

const itens = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_ITEM:
      // let formSchemaType = (action.carteira || {})._id ? "edit" : "add";
      return {
        ...state,
        item: action.item,
        loadingItem: false,
        fetchItemError: false,
        ItemFormTouched: false,
        // carteiraFormErrors: CarteiraValidate.validate({
        //   formObject: action.subject,
        //   formSchemaType
        // })
      };
    case FETCHING_ITENS:
      return {
        ...state,
        loadingItens: true,
        fetchItemError: false,
      };
    case FETCHING_ITEM:
      return {
        ...state,
        loadingItem: true,
        fetchItemError: false,
      };
    case FETCH_ITENS:
      return {
        ...state,
        loadingItens: false,
        itens: action.itens,
        fetchItensError: false,
        // order: action.order
      };
    case FETCH_ITEM_ERROR:
      return {
        ...state,
        loadingItem: false,
        item: { ...initialState.item },
        fetchItemError: action.error,
      };
    case FETCH_ITENS_ERROR:
      return {
        ...state,
        loadingItem: false,
        fetchItemError: action.error,
        loadingItens: false,
      };
    case CHANGE_ITEM:
      return {
        ...state,
        item: action.item,
      };
    case CHANGE_ITEM_TERM:
      return {
        ...state,
        buscaTerm: action.term,
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
        item: { ...initialState.item },
        // carteiraFormErrors: SubjectValidate.validate({}),
        // subjectFormTouched: false
      };
    case DELETE_ITEM:
      return {
        ...state,
        status: true,
      };
    case ADD_ITEM:
      return {
        ...state,
        status: true,
      };
    case EDIT_ITEM:
      return {
        ...state,
        status: true,
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
    case OPEN_MODAL_LEMBRETE:
      return {
        ...state,
        modalLembreteOpen: true,
      };
    case CLOSE_MODAL_LEMBRETE:
      return {
        ...state,
        modalLembreteOpen: false,
        status: true,
      };
    case CHANGE_STATUS:
      return {
        ...state,
        status: true,
      };
    case RESET_STATE:
      return {
        ...state,
        item: initialState.item,
      };
    default:
      return state;
  }
};

export default itens;
