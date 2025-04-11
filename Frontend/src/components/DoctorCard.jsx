import { Star, MapPin, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";

const DoctorCard = ({ doctor, onBookAppointment }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex items-center gap-4">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-medguard-100"
          />
          <div>
            <h3 className="font-semibold text-lg">{doctor.name}</h3>
            <p className="text-medguard-500">{doctor.speciality}</p>
            <div className="flex items-center mt-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < doctor.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 ml-2">{doctor.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      
        
        <div className="flex flex-wrap justify-between mt-5 pt-5 border-t">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin size={16} className="text-medguard-500" />
            <span>{doctor.distance}</span>
          </div>
          <div className="flex items-center gap-2 font-medium">
            <span className="text-gray-600">Fee:</span>
            <span className="text-medguard-500">{doctor.fee}</span>
          </div>
          <Button
            onClick={() => onBookAppointment(doctor)}
            className=" flex p-2 w-full mt-4 bg-medguard-500 hover:bg-medguard-600"
          >
            <Calendar size={16} className="mr-2" />
            Book Appointment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;