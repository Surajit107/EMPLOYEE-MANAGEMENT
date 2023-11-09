const express = require('express');
const router = express.Router();
const Verify = require('../middleware/Verify');
const UserController = require('../controller/UserController');
const Authentication = require('../middleware/authUser');


// ************* POST ROUTES ************* //
router.post('/user/signup', [Verify.duplicateUserCheck], UserController.registerUser);
router.post('/user/login', UserController.userLogin);
router.post('/add/department', [Authentication.verifyToken], UserController.addDepartment);
router.post('/update/department/:id', [Authentication.verifyToken], UserController.updateDepartment);
router.post('/delete/department/:id', [Authentication.verifyToken], UserController.deleteDepartment);

router.post('/filter/name/:filter_type', UserController.filterName);
router.post('/filter/location/:filter_type', UserController.filterLocation);

router.post('/update/user/department/:id', [Authentication.verifyToken], UserController.updateUserDepartment);

// ************* GET ROUTES ************* //
router.get('/get/all/department', UserController.getAllDepartment);
router.get('/get/all/employee', UserController.getAllEmployees);


module.exports = router;