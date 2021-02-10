require('dotenv').config()
const express = require('express')
const cors = require('cors')

const NewsRouter = require('./routes/news.router')

const app = express()

// middlewares
app.use(express.json())
app.use(cors())

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
