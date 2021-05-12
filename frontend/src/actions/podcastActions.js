import axios from 'axios'
import {
  PODCAST_REQUEST,
  PODCAST_SUCCESS,
  PODCAST_FAIL,
} from '../constants/podcastConstants'

export const getPodcasts = () => async (dispatch) => {
  try {
    dispatch({ type: PODCAST_REQUEST })

    const config = {
      headers: {
        Accept: 'application / json',
      },
    }

    const { data } = await axios.get(
      'https://anchor.fm/s/58a23110/podcast/rss',
      config
    )

    dispatch({
      type: PODCAST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PODCAST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
