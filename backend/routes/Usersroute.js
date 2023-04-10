const express = require("express");
const router = express.Router();
const usersController = require('../controllers/userscontroller')

router.route('/register').post(usersController.register)
router.route('/login').post(usersController.login)
router.route('/logout').get(usersController.logout)
router.route('/getUser/:email').get(usersController.getUserByEmail);
router.route('/checkAuth').get(usersController.authCheck);
// router.route('/profile/:id').get( usersController.profile);
module.exports = router;
