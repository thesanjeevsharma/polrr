const router = require('express').Router()
const sa = require('superagent')

router.post('/', async (req, res, next) => {
  try {
    const { sort, query, lang, page, pageSize } = req.body
    const { body } = await sa
      .get(
        `${process.env.PROXY}/everything?q=${query}&sortBy=${sort}&language=${lang}&page=${page}&pageSize=${pageSize}`
      )
      .set('X-Api-Key', process.env.API_KEY)

    if (body) {
      res.status(200).json({
        success: true,
        message: 'News fetched!',
        data: { articles: body.articles },
      })
    } else {
      throw Error('Failed to fetch news!')
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
