// models/doctor.js
const mongoose = require('mongoose');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const doctorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    specialization: {
      type: String,
      required: [true, "Specialization is required"],
    },
    fees: {
      type: Number,
      required: [true, "Fees per consultation is required"],
    },

    timings: {
      type: Object,
      required: [true, "Work timings are required"],
    },
    location: {
      ltd: {
          type: Number,
      },
      lng: {
          type: Number,
      }
  }
  },
  {
    timestamps: true,
  }
);

doctorSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
  return token;
}

doctorSchema.methods.comparePassword=async function(password){
  return await bcrypt.compare(password,this.password);
}

doctorSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
}

module.exports = mongoose.model('Doctor', doctorSchema);
