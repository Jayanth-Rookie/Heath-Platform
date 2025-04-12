// controllers/userController.js
const User = require('../models/user');
const Doctor=require('../models/doctor');
const Appointment=require('../models/appointment');
const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await User.hashPassword(password);
    console.log('hi');
    const existinguser=await User.findOne({email});
    if(existinguser){
      console.log('User already exists');
      return res.status(409).json({ error: 'User already exists' });
    }
    const user = new User({ username, email,password:hashedPassword });
    await user.save();
    const token=user.generateAuthToken();
    console.log(user);
    
    res.status(201).json({user,token});
  } catch (error) {
    console.log('In catch block');
    
    res.status(400).json({ error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginuser=async(req,res)=>{
  try {
    const { email, password } = req.body;
    console.log(email,password);
    const user= await User.findOne({email});
    if(!user){
      console.log('User not found');
      
      res.status(404).json({error:"user not found"});
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
    return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = user.generateAuthToken();
    res.cookie('token', token);
    console.log('token : ',token);
    
    res.status(200).json({token,user});
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
}
const getprofile=async(req,res)=>{res.send(req.user);};

const getdoctor=async(req,res)=>{
  const {Location}=req.body;
  console.log('Backend Location : ',Location);
  
  try {
    const doctors=await Doctor.find({
      location: {
        $geoWithin: {
            $centerSphere: [[Location.ltd,Location.lng], 500 / 6371]
        }
    }
    });
    console.log("Available Doctors : ",doctors);
    
    res.status(200).json({doctors});
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
}

const bookappointment=async(req,res)=>{
  try {
    const {userId,doctorId,date,time}=req.body;
    const user=await User.findById(userId);
    const doctor=await Doctor.findById(doctorId);
    console.log(user,doctor);
    const appointment=new Appointment({userId,doctorId,date,time,user:user.username,doctor:doctor.firstName});
    await appointment.save();
    res.status(200).json({appointment});
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
}

const getallappointments=async(req,res)=>{
  const {userId}=req.body;
  try {
    const appointment=await Appointment.find({userId});
    res.status(200).json({appointment});
  } catch (error) {
   console.log(error);
    res.status(400).json({ error: error.message });
  }
}
module.exports = { createUser, getUsers ,loginuser,getprofile,getdoctor,bookappointment,getallappointments};
