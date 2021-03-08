import {
  VIDEO_REQUEST,
  VIDEO_SUCCESS,
  VIDEO_FAIL,
  YOUTUBE_VIDEO_REQUEST,
  YOUTUBE_VIDEO_SUCCESS,
  YOUTUBE_VIDEO_FAIL,
} from '../constants/videoConstants'

export const listYoutubeVideosReducer = (state = { videos: [] }, action) => {
  switch (action.type) {
    case YOUTUBE_VIDEO_REQUEST:
      return { ...state, loading: true, success: false }
    case YOUTUBE_VIDEO_SUCCESS:
      return { success: true, loading: false, videos: action.payload }
    case YOUTUBE_VIDEO_FAIL:
      return { loadng: false, success: false, error: action.payload }
    default:
      return state
  }
}

export const listVideosReducer = (state = { videos: [] }, action) => {
  switch (action.type) {
    case VIDEO_REQUEST:
      return { loading: true, success: false, videos: [] }
    case VIDEO_SUCCESS:
      return {
        loading: false,
        success: true,
        videos: action.payload.videos,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case VIDEO_FAIL:
      return { loading: false, success: false, error: action.payload }
    default:
      return state
  }
}
