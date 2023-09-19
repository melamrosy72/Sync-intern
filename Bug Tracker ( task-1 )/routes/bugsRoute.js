const { getBug, makeBugFixed, updatebug, newBug, allBugs } = require('../controllers/bugs');
const { bugValidator } = require('../utils/validators/bugValidator');

const router = require('express').Router()



router.post('/', bugValidator, newBug)

router.get('/', allBugs)

router.get('/:bugId', getBug)

router.patch('/:bugId', bugValidator, updatebug);

router.patch('/fixed/:bugId', makeBugFixed);

//assignUserToBug >> to - do 

module.exports = router
