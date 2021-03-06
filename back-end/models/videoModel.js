import mongoose from 'mongoose'

const videoSchema = mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
})

const Video = mongoose.model('Video', videoSchema)
export default Video
