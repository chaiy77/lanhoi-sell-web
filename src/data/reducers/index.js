import { combineReducers } from 'redux';
import cartReducers, { types } from './cart';
import sellerReducers from './seller';
import customerReducers from './customer';
import orderReducers from './order';

export default combineReducers({
  Seller: sellerReducers,
  ShoppingCart: cartReducers,
  Customer: customerReducers,
  Orders: orderReducers,
});
