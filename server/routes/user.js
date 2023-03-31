const router = require('express').Router();
const controller = require('../controllers/user');

router.get('', controller.getUsers);
router.get('/:userId', controller.getUser);

router.post('', controller.addUser);
router.get('/logout', controller.logoutUser);

router.put('/:userId', controller.updateUser);
router.delete('/:userId', controller.deleteUser);

module.exports = router;
