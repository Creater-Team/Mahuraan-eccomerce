import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  addToMyCart,
  cartReducer,
  myCartReducer,
  removeCart,
  shippingInfoReducer,
  updateCartItem,
} from "./Reducers/Cart";
import { favReducer } from "./Reducers/fav";
import {
  createCategoryReducer,
  createProductReducer,
  deleteCategoryReducer,
  deleteProductReducer,
  editProductReducer,
  getCatsReducer,
  productReducers,
  productReviewsReducer,
  productViewReducers,
  reviewsOfProduct,
  updateCategoryReducer,
} from "./Reducers/productReducers";
import {
  editUserReducer,
  userReducer,
  usersReducer,
} from "./Reducers/userAuth";
import { toggleReducer } from "./Reducers/toggleReducer";
import {
  adminViewReducer,
  chartInfoReducer,
  deliveryToggle,
  featuredInfoReducer,
} from "./Reducers/adminReducers";
import {
  deliveredOrders,
  editOrderByAdminReducer,
  fetchDeliveredOrdersReducer,
  getAllOrdersReducer,
  getOrderByAdminReducer,
  getOrderReducer,
  ordersReducer,
  UndeliveredOrders,
} from "./Reducers/ordersReducer";
import { getCategoriesReducer } from "./Reducers/catsReducer";

// Reducers

const reducer = combineReducers({
  cart: cartReducer,
  favorites: favReducer,
  allProducts: productReducers,
  productView: productViewReducers,
  getCatsList: getCatsReducer,
  user: userReducer,
  reviews: reviewsOfProduct,
  newRev: productReviewsReducer,
  toggle: toggleReducer,
  adminFeatures: featuredInfoReducer,
  chartInfo: chartInfoReducer,
  createPro: createProductReducer,
  adminView: adminViewReducer,
  shippingInfo: shippingInfoReducer,
  myCart: myCartReducer,
  addMyCart: addToMyCart,
  removeCart: removeCart,
  updateCart: updateCartItem,
  allOrders: getAllOrdersReducer,
  placeOrder: ordersReducer,
  getOrder: getOrderReducer,
  editProduct: editProductReducer,
  deliveredOrders: deliveredOrders,
  undeliveredOrders: UndeliveredOrders,
  deleteItem: deleteProductReducer,
  toggleDelivery: deliveryToggle,
  newCategory: createCategoryReducer,
  updateCategory: updateCategoryReducer,
  deleteCategory: deleteCategoryReducer,
  getOrderByAdmin: getOrderByAdminReducer,
  editOrder: editOrderByAdminReducer,
  allUsers: usersReducer,
  editUser: editUserReducer,
});

const userFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : {};

const shippingFromStorage = localStorage.getItem("shipping")
  ? JSON.parse(localStorage.getItem("shipping"))
  : {};

const initialState = {
  user: { userInfo: userFromStorage },
  shippingInfo: shippingFromStorage,
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
