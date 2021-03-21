<<<<<<< HEAD
import { simpleAction, payloadAction } from './utils/actions';
import switchReducer from './utils/switchReducer';
// import { createStore as reduxCreateStore } from 'redux';

const types = {
  SET_CUSTOMER: '@customer/setCustomer',
  SET_ROOF: '@customer/setRoof',
  SET_PILE: '@customer/setPile',
  SET_SLAB: '@customer/setSlab',
  SET_CONCRETE: '@customer/setConcrete',
  SET_FENCE: '@customer/setFence',
  SET_WALL: '@customer/setWall',
};

export const actions = {
  setCustomer: data => payloadAction(types.SET_CUSTOMER)(data),
  setRoof: roofAreas => payloadAction(types.SET_ROOF)(roofAreas),
  setPile: piles => payloadAction(types.SET_PILE)(piles),
  setConcrete: areas => payloadAction(types.SET_CONCRETE)(areas),
  setFence: fence => payloadAction(types.SET_FENCE)(fence),
  setSlab: slabs => payloadAction(types.SET_SLAB)(slabs),
  setWall: walls => payloadAction(types.SET_WALL)(walls),

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
  // customer: {},
};

const reducers = [
  // [
  //   types.AUTO_LOGIN_SUCCESS,
  //   (state, action) => ({ ...state, user: action.payload }),
  // ],
  // [types.AUTO_LOGIN_FAILURE, state => ({ ...state, user: null })],
  [types.SET_CUSTOMER, (state, action) => ({ ...state, data: action.payload })],
  [types.SET_ROOF, (state, action) => ({ ...state, roofs: action.payload })],
  [types.SET_PILE, (state, action) => ({ ...state, piles: action.payload })],
  [
    types.SET_CONCRETE,
    (state, action) => ({ ...state, concrete: action.payload }),
  ],
  [types.SET_FENCE, (state, action) => ({ ...state, fences: action.payload })],
  [types.SET_SLAB, (state, action) => ({ ...state, slabs: action.payload })],
  [types.SET_WALL, (state, action) => ({ ...state, walls: action.payload })],
];

const customerReducers = switchReducer(reducers, initialState);
// const cartReducer = reduxCreateStore(reducers, initialState);
export default customerReducers;
=======
import { simpleAction, payloadAction } from './utils/actions';
import switchReducer from './utils/switchReducer';
// import { createStore as reduxCreateStore } from 'redux';

const types = {
  SET_CUSTOMER: '@customer/setCustomer',
  SET_ROOF: '@customer/setRoof',
  SET_PILE: '@customer/setPile',
  SET_SLAB: '@customer/setSlab',
  SET_CONCRETE: '@customer/setConcrete',
  SET_FENCE: '@customer/setFence',
  SET_WALL: '@customer/setWall',
};

export const actions = {
  setCustomer: data => payloadAction(types.SET_CUSTOMER)(data),
  setRoof: roofAreas => payloadAction(types.SET_ROOF)(roofAreas),
  setPile: piles => payloadAction(types.SET_PILE)(piles),
  setConcrete: areas => payloadAction(types.SET_CONCRETE)(areas),
  setFence: fence => payloadAction(types.SET_FENCE)(fence),
  setSlab: slabs => payloadAction(types.SET_SLAB)(slabs),
  setWall: walls => payloadAction(types.SET_WALL)(walls),

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
  // customer: {},
};

const reducers = [
  // [
  //   types.AUTO_LOGIN_SUCCESS,
  //   (state, action) => ({ ...state, user: action.payload }),
  // ],
  // [types.AUTO_LOGIN_FAILURE, state => ({ ...state, user: null })],
  [types.SET_CUSTOMER, (state, action) => ({ ...state, data: action.payload })],
  [types.SET_ROOF, (state, action) => ({ ...state, roofs: action.payload })],
  [types.SET_PILE, (state, action) => ({ ...state, piles: action.payload })],
  [
    types.SET_CONCRETE,
    (state, action) => ({ ...state, concrete: action.payload }),
  ],
  [types.SET_FENCE, (state, action) => ({ ...state, fences: action.payload })],
  [types.SET_SLAB, (state, action) => ({ ...state, slabs: action.payload })],
  [types.SET_WALL, (state, action) => ({ ...state, walls: action.payload })],
];

const customerReducers = switchReducer(reducers, initialState);
// const cartReducer = reduxCreateStore(reducers, initialState);
export default customerReducers;
>>>>>>> b23ac42965c58d56aa202044243f3a891b98e3cd
