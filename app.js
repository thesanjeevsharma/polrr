require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const job = require('./cron')
const NewsRouter = require('./routes/news.router')

const app = express()

// db connection
mongoose
  .connect('mongodb://localhost:27017/polrr', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to DB...')
  })
  .catch((err) => console.log(err))

// middlewares
app.use(express.json())
app.use(cors())

// cron jobs
job.topHeadlines.start()
job.everything.start()

// routes
app.use('/api/news', NewsRouter)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

// error handler
app.use((err, req, res, next) => {
  console.log(err.stack)
  res.status(500).json({ success: false, message: 'Internal server error!' })
})

app.listen(process.env.PORT, () => {
  console.log(`Server started on ${process.env.PORT}`)
})
