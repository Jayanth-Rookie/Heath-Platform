// routes/doctorRoutes.js
const express = require('express');
const { signup,login, getDoctors,getallappointments,updatestatus } = require('../controllers/doctorController');
const router = express.Router();

router.post('/signup', signup);  // Route to create a new doctor
router.post('/login', login);    // Route to get all doctors
// router.get('/getalldoctors',getDoctors);
router.post('/getallappointments',getallappointments);
router.post('/updatestatus',updatestatus);

module.exports = router;
