import axios from 'axios'
import {
  POSTS_UPDATE_REQUEST,
  POSTS_UPDATE_SUCCESS,
  POSTS_UPDATE_FAIL,
  LIST_POSTS_REQUEST,
  LIST_POSTS_SUCCESS,
  LIST_POSTS_FAIL,
  POSTS_CREATE_REQUEST,
  POSTS_CREATE_SUCCESS,
  POSTS_CREATE_FAIL,
} from '../constants/postsConstants'

export const createPost = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: POSTS_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/posts`, {}, config)

    dispatch({
      type: POSTS_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: POSTS_CREATE_FAIL,
      payload: message,
    })
  }
}

export const listPosts = () => async (dispatch) => {
  try {
    dispatch({ type: LIST_POSTS_REQUEST })

    const { data } = await axios.get(`/api/posts`)

    dispatch({
      type: LIST_POSTS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: LIST_POSTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updatePost = (post) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POSTS_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/posts/${post._id}`, post, config)

    dispatch({
      type: POSTS_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: POSTS_UPDATE_FAIL,
      payload: message,
    })
  }
}
