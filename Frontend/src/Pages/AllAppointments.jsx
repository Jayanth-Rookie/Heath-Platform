import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AppointmentCard from '../components/AppointmentCard';

const AllAppointments = () => {
  const { user } = useSelector((state) => state.user);
  const [appointments, setAppointments] = useState(null);

  const getAllAppointments = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/users/getallappointments',
        {
          userId: user._id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        }
      );
      console.log(response);
      setAppointments(response.data.appointment);
    } catch (error) {
      console.log(error);
      setAppointments([]);
    }
  };

  useEffect(() => {
    getAllAppointments();
  }, []);

  // Sample  card
  const sampleCard = [
    {
      _id: 'sample',
      title: 'Sample Appointment',
      description: 'This is a test card for design preview.',
      date: '2025-04-15',
      time: '10:00 AM',
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All Appointments</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {(appointments && appointments.length > 0
          ? appointments
          : sampleCard
        ).map((appointment) => (
          <AppointmentCard key={appointment._id} appointment={appointment} />
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;
