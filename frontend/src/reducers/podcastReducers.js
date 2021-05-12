import {
  PODCAST_REQUEST,
  PODCAST_SUCCESS,
  PODCAST_FAIL,
} from '../constants/podcastConstants'

export const listPodcastsReducer = (state = {}, action) => {
  switch (action.type) {
    case PODCAST_REQUEST:
      return { loading: true, success: false }
    case PODCAST_SUCCESS:
      return { success: true, loading: false, podcasts: action.payload }
    case PODCAST_FAIL:
      return { loadng: false, success: false, error: action.payload }
    default:
      return state
  }
}
