import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productTopRatedReducer,
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers'
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderDeliverReducer,
  orderListMyReducer,
  orderListReducer,
  orderChargeReducer,
  orderBilingReducer,
} from './reducers/orderReducers'

import { sripeConstantReducer } from './reducers/stripeReducers'

import {
  listVideosReducer,
  listYoutubeVideosReducer,
} from './reducers/videosReducers.js'

import {
  uploadImageReducer,
  createImageReducer,
  getAllImagesReducer,
  deleteImageReducer,
} from './reducers/imageReducers.js'

import {
  listPostsReducer,
  updatePostsReducer,
  createPostsReducer,
} from './reducers/postsReducers.js'

import { listPodcastsReducer } from './reducers/podcastReducers'

const reducer = combineReducers({
  // User Reducers
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,

  // Product Reducers
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedReducer,

  // Cart Reducers
  cart: cartReducer,

  // Order Reducers
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  orderCharge: orderChargeReducer,
  orderBilling: orderBilingReducer,
  stripeConstant: sripeConstantReducer,
  listVideos: listVideosReducer,
  imageUpload: uploadImageReducer,
  imageCreate: createImageReducer,
  allImages: getAllImagesReducer,
  imageDelete: deleteImageReducer,
  youtubeVideos: listYoutubeVideosReducer,
  postList: listPostsReducer,
  postUpdate: updatePostsReducer,
  createPost: createPostsReducer,
  listPodcasts: listPodcastsReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

//const devTools = applyMiddleware(...middleware)
const devTools = composeWithDevTools(applyMiddleware(...middleware))

const store = createStore(reducer, initialState, devTools)

export default store
