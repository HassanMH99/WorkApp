const express = require("express");
const router = express.Router();
const workerController = require('../controllers/workerController');
const handleUpload = require("../middleware/handleupload");

router.route('/addworker').post(handleUpload,workerController.createWorker)
// router.route('/login').get(usersController.login)
// router.route('/logout').get(usersController.logout)
// router.route('/profile/:id').get( usersController.profile);
module.exports = router;
