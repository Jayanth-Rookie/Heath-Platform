// controllers/doctorController.js
const Doctor = require('../models/doctor');
const User = require('../models/user');
const Appointment = require('../models/appointment');
const signup = async (req, res) => {
  try {
    console.log('Hi');
    
    const { firstName, lastName, phone, email, password, address, specialization ,fees,timings,location } = req.body;
    console.log(req.body);
    
    const isDoctorAlreadyExist = await Doctor.findOne({ email });
 
    if (isDoctorAlreadyExist) {
        return res.status(400).json({ message: 'Captain already exist' });
    }
    const hashedPassword = await Doctor.hashPassword(password);

    const doctor = new Doctor({
      firstName,
      lastName,
      phone,
      email,
      password: hashedPassword,
      address,
      specialization,
      fees,
      timings,
      location
    });
    const token = doctor.generateAuthToken();
    await doctor.save();

    res.status(201).json({ token, doctor });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login=async(req,res)=>{
  const {email,password}=req.body;
  const doctor=await Doctor.findOne({email});
  console.log(doctor);
  
  if(!doctor){
    return res.status(404).json({message:"Doctor not found"});
  }
  const isMatch=await doctor.comparePassword(password);
  if(!isMatch){
    return res.status(401).json({message:"Invalid email or password"});
  }
  const token=doctor.generateAuthToken();
  res.cookie('token', token);
  res.status(200).json({token,doctor});
}

const getallappointments=async(req,res)=>{
  const {doctorId}=req.body;
  try {
    const appointment=await Appointment.find({doctorId});
    res.status(200).json({appointment});
  } catch (error) {
   console.log(error);
    res.status(400).json({ error: error.message });
  }
}

const updatestatus=async(req,res)=>{
  const {appointmentId,status}=req.body;
  const appointment = await Appointment.findById(appointmentId);
  if(status=="approved")
  appointment.status = "Not completed";
  else
  appointment.status=status;
  await appointment.save();

  res.status(200).json({ appointment });

}

module.exports = { signup, getDoctors,login,getallappointments,updatestatus };
