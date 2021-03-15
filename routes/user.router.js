const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { lookup } = require('geoip-lite')
const User = require('../models/user.model')
const jwtMiddleware = require('../middlewares/jwt')

router.post('/google-login', async (req, res, next) => {
  try {
    const { email, firstName, lastName, googleId, profileImage } = req.body

    let user
    user = await User.findOne({ email, googleId, isDeleted: false })
    if (!user) {
      const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress
      const location = lookup(userIp)
      const newUser = new User({
        firstName,
        lastName,
        email,
        profileImage,
        googleId,
        method: 'google',
        location,
      })
      user = await newUser.save()
    }

    const token = await jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: '30d',
    })

    res.status(200).json({
      success: true,
      message: 'User logged in!',
      data: {
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          profileImage: user.profileImage,
          savedArticles: user.savedArticles,
          likedArticles: user.likedArticles,
        },
        token,
      },
    })
  } catch (error) {
    next(error)
  }
})

router.post(
  '/toggle-save',
  jwtMiddleware.authenticate,
  async (req, res, next) => {
    try {
      const { id } = req.decoded
      const { articleId } = req.body

      const user = await User.findById(id)

      const updatedSavedArticles = [...user.savedArticles]

      const index = updatedSavedArticles.findIndex(
        (id) => id.toString() === articleId
      )
      if (index !== -1) {
        updatedSavedArticles.splice(index, 1)
      } else {
        updatedSavedArticles.push(articleId)
      }

      user.savedArticles = updatedSavedArticles
      const updatedUser = await user.save()

      res.status(200).json({
        success: true,
        message: 'Article saved status toggled!',
        data: {
          savedArticles: updatedUser.savedArticles,
        },
      })
    } catch (error) {
      next(error)
    }
  }
)

router.get('/', jwtMiddleware.authenticate, async (req, res, next) => {
  try {
    const { id } = req.decoded

    const user = await User.findById(id)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found!',
        data: null,
      })
    }

    res.status(200).json({
      success: true,
      message: 'User details fetched!',
      data: {
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          profileImage: user.profileImage,
          savedArticles: user.savedArticles,
          likedArticles: user.likedArticles,
        },
      },
    })
  } catch (error) {
    next(error)
  }
})

router.get('/saved', jwtMiddleware.authenticate, async (req, res, next) => {
  try {
    const { id } = req.decoded

    const user = await User.findById(id).populate('savedArticles')

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found!',
        data: null,
      })
    }

    res.status(200).json({
      success: true,
      message: 'User details fetched!',
      data: {
        articles: user.savedArticles,
      },
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
