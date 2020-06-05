import { simpleAction, payloadAction } from './utils/actions';
import switchReducer from './utils/switchReducer';
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

const initialState = {
  // orders = [
  //   {
  //     group:'metalsheet',
  //     areas:[{
  //       no:1, products:[]
  //     }]
  //   },
  //   {
  //     group:'column',
  //     products:[]
  //   },
  //   {
  //     group:'concrete',
  //     areas:[{
  //       no:1,
  //       products:[]
  //     }]
  //   }
  // ],
  orders: [],
};

const reducers = [
  [
    types.ADD_ORDER,
    (state, action) => {
      console.log('@order/addOrder');
      return { ...state, seller: action.payload };
    },
  ],
  [
    types.REMOVE_ORDER,
    (state, action) => ({ ...state, seller: action.payload }),
  ],
];

const orderReducers = switchReducer(reducers, initialState);
// const cartReducer = reduxCreateStore(reducers, initialState);
export default orderReducers;
