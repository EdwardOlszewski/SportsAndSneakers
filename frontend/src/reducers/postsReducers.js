import {
  LIST_POSTS_REQUEST,
  LIST_POSTS_SUCCESS,
  LIST_POSTS_FAIL,
  POSTS_CREATE_REQUEST,
  POSTS_CREATE_SUCCESS,
  POSTS_CREATE_FAIL,
  POSTS_UPDATE_REQUEST,
  POSTS_UPDATE_SUCCESS,
  POSTS_UPDATE_FAIL,
  POSTS_UPDATE_RESET,
  LIST_POSTS_RESET,
} from '../constants/postsConstants'

export const listPostsReducer = (state = {}, action) => {
  switch (action.type) {
    case LIST_POSTS_REQUEST:
      return { loading: true, success: false }
    case LIST_POSTS_SUCCESS:
      return { loading: false, success: true, posts: action.payload }
    case LIST_POSTS_FAIL:
      return { loadng: false, error: action.payload }
    case LIST_POSTS_RESET:
      return {}
    default:
      return state
  }
}

export const updatePostsReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case POSTS_UPDATE_REQUEST:
      return { ...state, loading: true, success: false }
    case POSTS_UPDATE_SUCCESS:
      return { success: true, loading: false, items: action.payload }
    case POSTS_UPDATE_FAIL:
      return { loadng: false, success: false, error: action.payload }
    case POSTS_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const createPostsReducer = (state = {}, action) => {
  switch (action.type) {
    case POSTS_CREATE_REQUEST:
      return { ...state, loading: true, success: false }
    case POSTS_CREATE_SUCCESS:
      return { success: true, loading: false, posts: action.payload }
    case POSTS_CREATE_FAIL:
      return { loadng: false, error: action.payload }
    default:
      return state
  }
}
