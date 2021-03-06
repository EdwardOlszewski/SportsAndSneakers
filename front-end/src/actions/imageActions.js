import axios from 'axios'
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
  IMAGE_DELETE_REQUEST,
  IMAGE_DELETE_SUCCESS,
  IMAGE_DELETE_FAIL,
} from '../constants/imageConstants'
import { logout } from './userActions'

export const uploadImage = (file) => async (dispatch, getState) => {
  const formData = new FormData()
  formData.append('image', file)

  try {
    dispatch({
      type: UPLOAD_IMAGE_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }

    const { data } = await axios.post('/api/upload', formData, config)

    dispatch({
      type: UPLOAD_IMAGE_SUCCESS,
      payload: data,
    })

    dispatch(createImage({ data }))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: UPLOAD_IMAGE_FAIL,
      payload: message,
    })
  }
}

export const createImage = (imageURL) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_IMAGE_REQUEST,
    })

    const { data } = await axios.post(`/api/images`, imageURL)

    dispatch({
      type: CREATE_IMAGE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: CREATE_IMAGE_FAIL,
      payload: message,
    })
  }
}

export const getAllImages = (pageNumber = '') => async (dispatch, getState) => {
  try {
    dispatch({
      type: IMAGE_LIST_REQUEST,
    })
    const { data } = await axios.get(`/api/images?pageNumber=${pageNumber}`)

    dispatch({
      type: IMAGE_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: IMAGE_LIST_FAIL,
      payload: message,
    })
  }
}

export const deleteImage = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: IMAGE_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/images/${id}`, config)

    dispatch({
      type: IMAGE_DELETE_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: IMAGE_DELETE_FAIL,
      payload: message,
    })
  }
}
