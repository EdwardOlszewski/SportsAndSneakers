import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
  whoIAm: {
    type: String,
    required: false,
  },
  whatIDo: {
    type: String,
    required: false,
  },
  whereToFindMe: {
    type: String,
    required: false,
  },
})

const Post = mongoose.model('Post', postSchema)
export default Post
