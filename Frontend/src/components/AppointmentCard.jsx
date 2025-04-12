import { Calendar, Clock, Info } from 'lucide-react';

const AppointmentCard = ({ appointment }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border hover:shadow-md transition-shadow p-5">
      <div className="space-y-2">
        <h3 className="font-semibold text-lg text-medguard-600">Dr. {appointment.doctor}</h3>
        <div className="flex items-start gap-2 text-gray-700">
          <Info size={16} className="mt-1 text-medguard-500" />
          <p>{appointment.description}</p>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar size={16} className="text-medguard-500" />
          <p>{appointment.date}</p>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Clock size={16} className="text-medguard-500" />
          <p>{appointment.time}</p>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
