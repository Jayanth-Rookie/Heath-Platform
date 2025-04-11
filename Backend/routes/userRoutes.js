// routes/userRoutes.js
const express = require('express');
const { createUser, getUsers,loginuser,getprofile ,getdoctor,bookappointment,getallappointments} = require('../controllers/userController');
const router = express.Router();
const authmiddleware=require('../middleware/authmiddleware')

router.post('/signup', createUser);  // Route to create a new user
router.get('/getuser', getUsers); 
router.get('/profile',authmiddleware.authUser,getprofile)    // Route to get all users
router.post('/loginuser',loginuser)
router.post('/getdoctor',authmiddleware.authUser,getdoctor);
router.post('/bookappointment',bookappointment);
router.post('/getallappointments',getallappointments);

module.exports = router;
