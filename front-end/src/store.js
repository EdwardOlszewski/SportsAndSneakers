import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { listVideosReducer2 } from './reducers/videosReducers.js'
import { listYoutubeVideosReducer } from './reducers/videosReducers.js'
import { videoPagesReducer } from './reducers/videosReducers.js'

import { uploadImageReducer } from './reducers/imageReducers.js'
import { createImageReducer } from './reducers/imageReducers.js'
import { getAllImagesReducer } from './reducers/imageReducers.js'
import { deleteImageReducer } from './reducers/imageReducers.js'

import { userLoginReducer } from './reducers/userReducers.js'

const reducer = combineReducers({
  listVideos: listVideosReducer2,
  imageUpload: uploadImageReducer,
  imageCreate: createImageReducer,
  allImages: getAllImagesReducer,
  userLogin: userLoginReducer,
  imageDelete: deleteImageReducer,
  youtubeVideos: listYoutubeVideosReducer,
  videoPages: videoPagesReducer,
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
