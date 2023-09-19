const { newUser, loginUser, allUsers } = require('../controllers/auth')
const { signupValidator, loginValidator } = require('../utils/validators/authValidator')
const router = require('express').Router()


router.post('/signup', signupValidator ,newUser)
router.post('/login', loginValidator ,loginUser)
router.get('/',allUsers)
module.exports = router
