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
  // loadingCarteira: false,
  // loadingCarteiras: false,
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

// const SubjectValidate = new ValidateFormObject(carteiraschema)

const cotacao = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_COTACAO:
      return {
        ...state,
        cotacao: action.cotacao,
        // loadingCarteira: false,
        // fetchCarteiraError: false,
        // carteiraFormTouched: false
      };
    case FETCHING_COTACOES:
      return {
        ...state,
        // loadingCarteiras: true,
        // fetchCarteiraError: false,
      };
    case FETCHING_COTACAO:
      return {
        ...state,
        // loadingCarteira: true,
        // fetchCarteiraError: false,
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
      // formSchemaType = action.subject._id ? 'edit' : 'add'
      return {
        ...state,
        cotacao: action.cotacao,
      };
    case COTACAO_FORM_ERROR:
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
    case NEW_FORM_COTACAO:
      return {
        ...state,
        cotacao: { ...initialState.cotacao },
        // carteiraFormErrors: SubjectValidate.validate({}),
        // subjectFormTouched: false
      };
    case ADD_COTACAO:
      return {
        ...state,
        loadingCotacoes: false,
        fetchCotacaoError: false,
        loadingCotacao: false,
        // cotacoes: [...state.cotacoes, action.cotacao],
      };
    case EDIT_COTACAO:
      return {
        ...state,
        // carteiras: state.carteiras.map((carteira) => {
        //   if (carteira.id === action.carteira.id) {
        //     return action.carteira;
        //   }
        //   return carteira;
        // }),
        // loadingCarteiras: false,
        // fetchCarteiraError: false,
        // loadingCarteira: false,
        // fetchCarteirasError: false,
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
