const express = require("express");
const router = express.Router();
const usersController = require('../controllers/userscontroller')

router.route('/register').post(usersController.register)
router.route('/login').get(usersController.login)
router.route('/logout').get(usersController.logout)
// router.route('/profile/:id').get( usersController.profile);
module.exports = router;
