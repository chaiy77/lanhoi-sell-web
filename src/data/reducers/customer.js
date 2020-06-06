import { simpleAction, payloadAction } from './utils/actions';
import switchReducer from './utils/switchReducer';
// import { createStore as reduxCreateStore } from 'redux';

const types = {
  SET_CUSTOMER: '@customer/setCustomer',
  SET_ROOF: '@customer/setRoof',
  SET_COLUMN: '@customer/setColumn',
  SET_FLOOR: '@customer/setFloor',
  SET_CONCRETE: '@customer/setConcrete',
  SET_FENCE: '@customer/setFence',
  SET_GROUNDWALL: '@customer/setGroudWall',
};

export const actions = {
  setCustomer: customer => payloadAction(types.SET_CUSTOMER)(customer),
  setRoof: roofAreas => payloadAction(types.SET_ROOF)(roofAreas),
  setColumn: columns => payloadAction(types.SET_COLUMN)(columns),
  setConcrete: areas => payloadAction(types.SET_CONCRETE)(areas),
  setFence: areas => payloadAction(types.SET_FENCE)(areas),
  setFloor: areas => payloadAction(types.SET_FLOOR)(areas),
  setGroudWall: areas => payloadAction(types.SET_GROUNDWALL)(areas),

  // logout: simpleAction(types.LOGOUT),
};

const initialState = {
  // customer = {
  //   name:""
  //   address:""
  //   telNo.:""
  //   Roof:[{no:1,wide:10,long:10},{no:2,wide:10,long:10}],
  //   Concrete:[{no:1,wide:10,long:10},{no:2,wide:10,long:10}],
  //   Floor:[{no:1,wide:10,long:10},{no:2,wide:10,long:10}],
  //   Column:[],
  //   Fence:[{no:1,long:10,height:5},{no:2,long:20,height:5}],
  //   GroundWall:[{no:1,long:10,height:5},{no:2,long:20,height:5}]
  // }
  customer: {},
};

const reducers = [
  // [
  //   types.AUTO_LOGIN_SUCCESS,
  //   (state, action) => ({ ...state, user: action.payload }),
  // ],
  // [types.AUTO_LOGIN_FAILURE, state => ({ ...state, user: null })],
  [types.SET_CUSTOMER, (state, action) => ({ ...state, data: action.payload })],
  [types.SET_ROOF, (state, action) => ({ ...state, roofs: action.payload })],
  [
    types.SET_COLUMN,
    (state, action) => ({ ...state, columns: action.payload }),
  ],
  [
    types.SET_CONCRETE,
    (state, action) => ({ ...state, concrete: action.payload }),
  ],
  [types.SET_FENCE, (state, action) => ({ ...state, fences: action.payload })],
  [types.SET_FLOOR, (state, action) => ({ ...state, floor: action.payload })],
  [
    types.SET_GROUNDWALL,
    (state, action) => ({ ...state, groundWall: action.payload }),
  ],
];

const customerReducers = switchReducer(reducers, initialState);
// const cartReducer = reduxCreateStore(reducers, initialState);
export default customerReducers;
