import {
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAIL,
  CREATE_IMAGE_REQUEST,
  CREATE_IMAGE_SUCCESS,
  CREATE_IMAGE_FAIL,
  IMAGE_LIST_REQUEST,
  IMAGE_LIST_SUCCESS,
  IMAGE_LIST_FAIL,
  UPLOAD_IMAGE_RESET,
  CREATE_IMAGE_RESET,
  IMAGE_DELETE_REQUEST,
  IMAGE_DELETE_SUCCESS,
  IMAGE_DELETE_FAIL,
  IMAGE_DELETE_RESET,
} from '../constants/imageConstants'

export const uploadImageReducer = (state = { videoURL: [] }, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE_REQUEST:
      return { loading: true, success: false }
    case UPLOAD_IMAGE_SUCCESS:
      return { loading: false, success: true, videoURL: action.payload }
    case UPLOAD_IMAGE_FAIL:
      return { loading: false }
    case UPLOAD_IMAGE_RESET:
      return {}
    default:
      return state
  }
}

export const createImageReducer = (state = { videoURL: [] }, action) => {
  switch (action.type) {
    case CREATE_IMAGE_REQUEST:
      return { loading: true, success: false }
    case CREATE_IMAGE_SUCCESS:
      return { loading: false, success: true, videoURL: action.payload }
    case CREATE_IMAGE_FAIL:
      return { loading: false, state: action.payload }
    case CREATE_IMAGE_RESET:
      return {}
    default:
      return state
  }
}

export const getAllImagesReducer = (state = { images: [] }, action) => {
  switch (action.type) {
    case IMAGE_LIST_REQUEST:
      return { loading: true, success: false }
    case IMAGE_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        images: action.payload.images,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case IMAGE_LIST_FAIL:
      return { loading: false, state: action.payload }
    default:
      return state
  }
}

export const deleteImageReducer = (state = {}, action) => {
  switch (action.type) {
    case IMAGE_DELETE_REQUEST:
      return { loading: true, success: false }
    case IMAGE_DELETE_SUCCESS:
      return { loading: false, success: true }
    case IMAGE_DELETE_FAIL:
      return { loading: false, state: action.payload }
    case IMAGE_DELETE_RESET:
      return {}
    default:
      return state
  }
}
