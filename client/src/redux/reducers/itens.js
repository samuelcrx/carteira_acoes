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
} = carteiraItensActions;

const initialState = {
  loadingCarteira: false,
  loadingCarteiras: false,
  fetchCarteiraError: false,
  fetchCarteirasError: false,
  itens: [],
  // order: {
  //   column: "nome",
  //   direction: 1,
  // },
  item: {
    id: '',
    ca_crt_codigo: '',
    ca_aco_codigo: '',
    ca_cri_quantidade: 0,
    ca_cri_valor_medio: '',
    acao_id: '',
    ca_cotacao: 0
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
    // case CHANGE_ORDER_COLUMN:
    //   return {
    //     ...state,
    //     order: {
    //       direction: 1,
    //       column: action.column,
    //     },
    //   };
    // case CHANGE_ORDER_DIRECTION:
    //   return {
    //     ...state,
    //     order: {
    //       ...state.order,
    //       direction: action.direction,
    //     },
    //   };
    // case CHANGE_PAGE:
    //   return {
    //     ...state,
    //     carteirasPagination: {
    //       ...state.carteirasPagination,
    //       page: action.page,
    //     },
    //   };
    // case CHANGE_PER_PAGE:
    //   return {
    //     ...state,
    //     carteirasPagination: {
    //       ...state.carteirasPagination,
    //       rowsPerPage: action.perPage,
    //     },
    //   };
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
      // formSchemaType = action.subject._id ? 'edit' : 'add'
      return {
        ...state,
        item: action.item
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
        loadingItens: false,
        fetchItemError: false,
        itens: state.itens.map((item) => {
          if (item.id === (action.item || {}).id) {
            return action.item;
          }
          return item;
        }),
      };
    case ADD_ITEM:
      return {
        ...state,
        loadingItens: false,
        fetchItemError: false,
        loadingItem: false,
        itens: [...state.itens, action.item],
      };
    case EDIT_ITEM:
      return {
        ...state,
        itens: state.itens.map((item) => {
          if (item.id === action.item.id) {
            return action.item;
          }
          return item;
        }),
        loadingItens: false,
        fetchItemError: false,
        loadingItem: false,
        fetchItensError: false,
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

export default itens;
