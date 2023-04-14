const express = require("express");
const router = express.Router();
const workerController = require('../controllers/workerController');
const upload = require("../middleware/handleupload");

router.route('/addworker/:userId').post(upload.single('cv'),workerController.createWorker)
// router.route('/login').get(usersController.login)
// router.route('/logout').get(usersController.logout)
router.route('/:id').get( workerController.getWorkerById);
module.exports = router;
