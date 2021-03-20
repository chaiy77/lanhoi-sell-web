import { simpleAction, payloadAction } from './utils/actions';
import switchReducer from './utils/switchReducer';
import * as R from 'ramda';
// import { createStore as reduxCreateStore } from 'redux';

const types = {
  ADD_ORDER: '@order/addOrder',
  REMOVE_ORDER: '@order/removeOrder',
};

export const actions = {
  addOrder: order => payloadAction(types.ADD_ORDER)(order),
  removeOrder: order => payloadAction(types.REMOVE_ORDER)(order),
  // logout: simpleAction(types.LOGOUT),
};

// orders = {
//    metalsheet : areas:[{ no:1, products:[] }]
//    column :  areas:[{no:1, products:[] }]
//    concrete : areas:[{ no:1, products:[] }]
// }

const initialState = {};

const reducers = [
  [
    types.ADD_ORDER,
    (state, action) => {
      // console.log('@order/addOrder');
      let _order = { ...state };
      _order[action.payload.group] = { areas: action.payload.areas };
      return Object.assign({}, state, _order);
    },
  ],
  [
    types.REMOVE_ORDER,
    (state, action) => ({ ...state, orders: action.payload }),
  ],
];

const orderReducers = switchReducer(reducers, initialState);
// const cartReducer = reduxCreateStore(reducers, initialState);
export default orderReducers;
