const { getBug, updatebug, newBug, allBugs, deleteBug, bugsview, bugFormView } = require('../controllers/bugs');
const { bugValidator } = require('../utils/validators/bugValidator');
const router = require('express').Router()

router.post('/', bugValidator,newBug)
router.get('/', allBugs)
router.get('/bug/:bugId', getBug)
router.patch('/bug/:bugId', updatebug);
router.delete('/delete/:bugId',deleteBug)

router.get('/all',bugsview)
router.get('/bug-form',bugFormView)
//assignUserToBug >> assign users to bugs with notification or recieving mails feature may be implemented later

module.exports = router
