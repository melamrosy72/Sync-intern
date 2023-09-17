const { getBug, makeBugFixed, updatebug, newBug, allBugs } = require('../controllers/bugs');

const router = require('express').Router()

router.route('/')
    .post(newBug)
    .get(allBugs);

router.get('/:bugId', getBug)

router.patch('/:bugId', updatebug);

router.patch('/fixed/:bugId', makeBugFixed);

module.exports = router
