const router = require('express').Router()
const News = require('../models/news.model')

router.get('/', async (req, res, next) => {
  try {
    const { from, skip, limit } = req.query
    let count
    if (skip == 0) {
      count = await News.count({ from })
    }
    const articles = await News.find({ from })
      .sort({ publishedAt: -1 })
      .skip(+skip)
      .limit(+limit)
    res.status(200).json({
      success: true,
      message: 'News fetched!',
      data: { articles, ...(count && { count }) },
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
