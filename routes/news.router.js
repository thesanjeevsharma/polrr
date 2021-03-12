const router = require('express').Router()
const News = require('../models/news.model')

router.get('/', async (req, res, next) => {
  try {
    const { from, skip, limit } = req.query
    const articles = await News.find({ from })
      .sort({ publishedAt: -1 })
      .skip(+skip)
      .limit(+limit)
    res.status(200).json({
      success: true,
      message: 'News fetched!',
      data: { articles },
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
