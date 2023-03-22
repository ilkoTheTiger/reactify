const router = require('express').Router();
const controller = require('../controllers/commute');

router.get('', controller.allCommutes);
router.get('/:commuteId', controller.getCommute);

router.post('', controller.addCommute);

router.put('/:commuteId', controller.updateCommute);
router.delete('/:commuteId', controller.deleteCommute);

module.exports = router;
