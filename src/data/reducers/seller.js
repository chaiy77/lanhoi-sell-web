import { simpleAction, payloadAction } from './utils/actions';
import switchReducer from './utils/switchReducer';
// import { createStore as reduxCreateStore } from 'redux';

const types = {
  LOGIN: '@seller/login',
  LOGOUT: '@seller/logout',
};

export const actions = {
  login: seller => payloadAction(types.LOGIN)(seller),
  logout: simpleAction(types.LOGOUT),
  // autoLoginRequest: simpleAction(types.AUTO_LOGIN_REQUEST),
  // autoLoginSuccess: user => payloadAction(types.AUTO_LOGIN_SUCCESS)(user),
  // autoLoginFailure: error => payloadAction(types.AUTO_LOGIN_FAILURE)(error),
  // loginSuccess: user => payloadAction(types.LOGIN_SUCCESS)(user),
  // logout: simpleAction(types.LOGOUT),
};

const initialState = {
  seller: null,
};

// const cartReducers = (state = initialState, action) => {
//   if (action.type === types.ADD_ITEM_TO_CART) {
//     console.log(types.ADD_ITEM_TO_CART);
//     return { ...state, items: action.payload };
//   }
//   return state;
// };

const reducers = [
  // [
  //   types.AUTO_LOGIN_SUCCESS,
  //   (state, action) => ({ ...state, user: action.payload }),
  // ],
  // [types.AUTO_LOGIN_FAILURE, state => ({ ...state, user: null })],
  [types.LOGIN, (state, action) => ({ ...state, seller: action.payload })],
  [types.LOGOUT, state => ({ ...state, seller: null })],
];

const sellerReducers = switchReducer(reducers, initialState);
// const cartReducer = reduxCreateStore(reducers, initialState);
export default sellerReducers;
