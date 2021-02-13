const CronJob = require('cron').CronJob
const sa = require('superagent')

const News = require('./models/news.model')

const topHeadlines = new CronJob('*/33 * * * *', async () => {
  try {
    console.log('Running cron job for top-headlines...')
    const { body } = await sa
      .get(
        `${process.env.PROXY}/top-headlines?q=climate+change&language=en&pageSize=100`
      )
      .set('X-Api-Key', process.env.API_KEY)

    if (body) {
      for (const article of body.articles) {
        const found = await News.findOne({
          title: article.title,
          'source.name': article.source.name,
        })
        if (!found) {
          const newArticle = new News({ ...article, from: 'top-headlines' })
          await newArticle.save()
        }
      }
    } else {
      throw Error('Failed to fetch news!')
    }
  } catch (error) {
    console.log(error)
  }
})

const everything = new CronJob('*/30 * * * *', async () => {
  try {
    console.log('Running cron job for everything...')
    const { body } = await sa
      .get(
        `${process.env.PROXY}/everything?q=climate+change&language=en&pageSize=100`
      )
      .set('X-Api-Key', process.env.API_KEY_OLD)

    if (body) {
      for (const article of body.articles) {
        const found = await News.findOne({
          title: article.title,
          'source.name': article.source.name,
        })
        if (!found) {
          const newArticle = new News({ ...article, from: 'everything' })
          await newArticle.save()
        }
      }
    } else {
      throw Error('Failed to fetch news!')
    }
  } catch (error) {
    console.log(error)
  }
})

module.exports = {
  topHeadlines,
  everything,
}
