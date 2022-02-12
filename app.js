require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const config = require('./config')
const job = require('./cron')
const NewsRouter = require('./routes/news.router')
const UserRouter = require('./routes/user.router')

const app = express()

// db connection
mongoose
  .connect(config.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to DB...')
  })
  .catch((err) => console.log(err))

// middlewares
app.use(express.static(__dirname + '/client/build'))
app.use(express.json())
app.use(cors())

// cron jobs
if (process.env.NODE_ENV !== 'development') {
  job.topHeadlines.start()
  job.everything.start()
}

// routes
app.use('/api/news', NewsRouter)
app.use('/api/user', UserRouter)
app.get('/', (req, res) => {
  res.sendFile('index.html')
})

// error handler
app.use((err, req, res, next) => {
  console.log(err.stack)
  res.status(500).json({ success: false, message: 'Internal server error!' })
})

app.listen(process.env.PORT, () => {
  console.log(`Server started on ${process.env.PORT}`)
})
