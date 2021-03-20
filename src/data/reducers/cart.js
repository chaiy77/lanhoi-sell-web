import { simpleAction, payloadAction } from './utils/actions';
import switchReducer from './utils/switchReducer';
// import { createStore as reduxCreateStore } from 'redux';

const types = {
  ADD_ITEM_TO_CART: '@cart/addItemToCart',
  REMOVE_ITEM_FROM_CART: '@cart/removeItemFromCart',
  // AUTO_LOGIN_REQUEST: '@auth/autoLogin/request`',
  // AUTO_LOGIN_SUCCESS: '@auth/autoLogin/success',
  // AUTO_LOGIN_FAILURE: '@auth/autoLogin/failure',
  // LOGIN_SUCCESS: '@auth/login/success',
  // LOGOUT_REQUEST: '@auth/logout/request',
  // LOGOUT: '@auth/logout/success',
};

export const actions = {
  addItemToCart: item => payloadAction(types.ADD_ITEM_TO_CART)(item),
  removeItemFromCart: item => payloadAction(types.REMOVE_ITEM_FROM_CART)(item),
  // autoLoginRequest: simpleAction(types.AUTO_LOGIN_REQUEST),
  // autoLoginSuccess: user => payloadAction(types.AUTO_LOGIN_SUCCESS)(user),
  // autoLoginFailure: error => payloadAction(types.AUTO_LOGIN_FAILURE)(error),
  // loginSuccess: user => payloadAction(types.LOGIN_SUCCESS)(user),
  // logout: simpleAction(types.LOGOUT),
};

const initialState = {
  cart: [],
};

// const cartReducers = (state = initialState, action) => {
//   if (action.type === types.ADD_ITEM_TO_CART) {
//     console.log(types.ADD_ITEM_TO_CART);
//     return { ...state, items: action.payload };
//   }
//   return state;
// };

const reducers = [
  [
    types.ADD_ITEM_TO_CART,
    (state, action) => {
      // console.log(types.ADD_ITEM_TO_CART);
      // console.log('with payload: ', action.payload);
      let _no = { ...state };
      let _item = {
        no: _no.cart.length + 1,
        product: action.payload,
      };

      return { ...state, cart: state.cart.concat(_item) };
    },
  ],
  [
    types.REMOVE_ITEM_FROM_CART,
    (state, action) => {
      return { ...state, cart: state.cart };
    },
  ],
  // [
  //   types.AUTO_LOGIN_SUCCESS,
  //   (state, action) => ({ ...state, user: action.payload }),
  // ],
  // [types.AUTO_LOGIN_FAILURE, state => ({ ...state, user: null })],
  // [
  //   types.LOGIN_SUCCESS,
  //   (state, action) => ({ ...state, user: action.payload }),
  // ],
  // [types.LOGOUT, state => ({ ...state, user: null })],
];

const cartReducers = switchReducer(reducers, initialState);
// const cartReducer = reduxCreateStore(reducers, initialState);
export default cartReducers;
