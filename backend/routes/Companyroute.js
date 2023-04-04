const express = require("express");
const router = express.Router();
const companyController = require('../controllers/companyController')

router.route('/addCompany').post(companyController.AddCompany)
// router.route('/login').get(usersController.login)
// router.route('/logout').get(usersController.logout)
// router.route('/profile/:id').get( usersController.profile);
module.exports = router;
