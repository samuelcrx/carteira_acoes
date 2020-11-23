import { messageActions } from "../actions";
const { CHANGE_MESSAGE, CLEAR_MESSAGE } = messageActions;

const initialState = {
  message: "",
  messageDuration: 5000,
  anchorOrigin: { vertical: "bottom", horizontal: "right" },
};

const message = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_MESSAGE:
      return {
        ...state,
        message: action.message || "",
        messageDuration: action.messageDuration || initialState.messageDuration,
        anchorOrigin: action.anchorOrigin || initialState.anchorOrigin,
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        message: "",
      };
    default:
      return state;
  }
};

export default message;
