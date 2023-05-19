import * as type from "../types/type";

const initialState = {
  user: [],
  loading: false,
  error: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case type.SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case type.SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
