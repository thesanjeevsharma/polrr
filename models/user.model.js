const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    profileImage: {
      type: String,
    },
    method: {
      type: String,
      enum: ['manual', 'google', 'twitter'],
      required: [true, 'Login method is required'],
    },
    googleId: {
      type: String,
    },
    location: {
      type: Object,
    },
    savedArticles: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'News',
      },
    ],
    likedArticles: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'News',
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', UserSchema)
