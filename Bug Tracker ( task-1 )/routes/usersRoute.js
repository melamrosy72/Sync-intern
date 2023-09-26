const { allUsers, deleteUser, editPosition, usersView } = require('../controllers/users')
const router = require('express').Router()


router.get('/',allUsers)
router.patch('/user/:userId',editPosition)
router.delete('/delete/:userId',deleteUser)

router.get('/all',usersView)
module.exports = router;
