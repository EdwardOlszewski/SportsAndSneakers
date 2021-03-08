import axios from 'axios'
import {
  VIDEO_REQUEST,
  VIDEO_SUCCESS,
  VIDEO_FAIL,
  VIDEO_CREATE_REQUEST,
  VIDEO_CREATE_SUCCESS,
  VIDEO_CREATE_FAIL,
  YOUTUBE_VIDEO_REQUEST,
  YOUTUBE_VIDEO_SUCCESS,
  YOUTUBE_VIDEO_FAIL,
} from '../constants/videoConstants'

export const createVideo = (url, publishedAt) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VIDEO_CREATE_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      `/api/videos`,
      { url, publishedAt },
      config
    )

    dispatch({
      type: VIDEO_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: VIDEO_CREATE_FAIL,
      payload: message,
    })
  }
}

export const listAllVideos = (pageNumber = '') => async (dispatch) => {
  try {
    dispatch({ type: VIDEO_REQUEST })

    const { data } = await axios.get(`/api/videos?pageNumber=${pageNumber}`)

    dispatch({
      type: VIDEO_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: VIDEO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listYoutubeVideos = (pageNumber = '') => async (dispatch) => {
  try {
    dispatch({ type: YOUTUBE_VIDEO_REQUEST })

    const config = {
      headers: {
        Accept: 'application / json',
      },
    }

    const { data } = await axios.get(
      'https://www.googleapis.com/youtube/v3/search?key=AIzaSyArTHtmLPFTgmJEoymS3MLQA2b7uOtKRqA&channelId=UCzeV03hagrR7mtE30TqpQ8g&type=video&part=snippet&fields=items(id(videoId), snippet(publishedAt))&order=date&maxResults=20',
      config
    )

    dispatch({
      type: YOUTUBE_VIDEO_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: YOUTUBE_VIDEO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
