const mongoose = require('mongoose')

const NewsSchema = new mongoose.Schema(
  {
    source: {
      id: {
        type: String,
      },
      name: {
        type: String,
        required: true,
      },
    },
    author: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    url: {
      type: String,
    },
    urlToImage: {
      type: String,
    },
    publishedAt: {
      type: String,
    },
    content: {
      type: String,
    },
    from: {
      type: String,
      enum: ['top-headlines', 'everything'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('News', NewsSchema)
