import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Users, Activity, User, Video } from "lucide-react";
// import { Calendar, Clock, Video } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const DoctorAppointments = () => {
  const { toast } = useToast();
  const { doctor } = useSelector((state) => state.doctor);
  
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/doctors/getallappointments',
        {
          doctorId: doctor._id,
        },
      );
      setAppointments(response.data.appointment);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setAppointments([]); // empty on error
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleReschedule = (appointmentId) => {
    toast({
      title: "Rescheduling initiated",
      description: "You can now set a new date and time for this appointment.",
    });
  };

  const handleStartCall = (appointmentId) => {
    toast({
      title: "Video call",
      description: "Starting video call with patient...",
    });
  };

  const handleViewPatientDetails = (patientId) => {
    toast({
      title: "Patient details",
      description: "Redirecting to patient details...",
    });
  };

  const handlestatus=async(id,status)=>{
    try {
      const response=await axios.post('http://localhost:3000/doctors/updatestatus',{appointmentId:id,status:status});
      fetchAppointments();
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Appointment Management</h1>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="all">All Appointments</TabsTrigger>
        </TabsList>

        
        <TabsContent value="upcoming" className="space-y-4 mt-6">
                {appointments.length > 0 ? (
                  appointments.map((appointment) =>
                    appointment.status === "Not completed" ? (
                      <div
                        key={appointment._id}
                        className="flex justify-between items-center border rounded-md p-4 bg-white shadow-sm hover:shadow-md transition"
                      >
                        <div className="flex items-center gap-4">
                          <div className="bg-medguard-100 text-medguard-700 h-12 w-12 rounded-full flex items-center justify-center shadow-inner">
                            <User size={20} />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800">{appointment.user}</div>
                            <div className="text-sm text-gray-500">{appointment.status}</div>
                          </div>
                        </div>
        
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-medguard-600 font-medium">{appointment.time}</span>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-green-600 text-green-700 hover:bg-green-50"
                              // onClick={() => console.log('Accepted', appointment._id)}
                              onClick={()=>{handlestatus(appointment._id,"Completed")}}
        
                            >
                              Completed
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-600 text-red-700 hover:bg-red-50"
                              // onClick={() => console.log('Rejected', appointment._id)}
                              onClick={()=>{handlestatus(appointment._id,"Notcompleted")}}
                              // onClick
                            >
                              Not Completed
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : null
                  )
                ) : (
                  <div className="text-center py-8">
                    <h3 className="font-medium text-lg">No upcoming appointments</h3>
                    <p className="text-gray-500 text-sm">You're all clear for now</p>
                  </div>
                )}
        
              </TabsContent>

              <TabsContent value="completed" className="space-y-4 mt-6">
                {appointments.length > 0 ? (
                  appointments.map((appointment) =>
                    appointment.status === "Completed" ? (
                      <div
                        key={appointment._id}
                        className="flex justify-between items-center border rounded-md p-4 bg-white shadow-sm hover:shadow-md transition"
                      >
                        <div className="flex items-center gap-4">
                          <div className="bg-medguard-100 text-medguard-700 h-12 w-12 rounded-full flex items-center justify-center shadow-inner">
                            <User size={20} />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800">{appointment.user}</div>
                            <div className="text-sm text-gray-500">{appointment.status}</div>
                          </div>
                        </div>
        
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-medguard-600 font-medium">{appointment.time}</span>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-green-600 text-green-700 hover:bg-green-50"
                              // onClick={() => console.log('Accepted', appointment._id)}
                              onClick={()=>{handlestatus(appointment._id,"Completed")}}
        
                            >
                              Completed
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-600 text-red-700 hover:bg-red-50"
                              // onClick={() => console.log('Rejected', appointment._id)}
                              onClick={()=>{handlestatus(appointment._id,"Notcompleted")}}
                              // onClick
                            >
                              Not Completed
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : null
                  )
                ) : (
                  <div className="text-center py-8">
                    <h3 className="font-medium text-lg">No upcoming appointments</h3>
                    <p className="text-gray-500 text-sm">You're all clear for now</p>
                  </div>
                )}
        
              </TabsContent>

              <TabsContent value="all" className="space-y-4 mt-6">
                {appointments.length > 0 ? (
                  appointments.map((appointment) =>
                     (
                      <div
                        key={appointment._id}
                        className="flex justify-between items-center border rounded-md p-4 bg-white shadow-sm hover:shadow-md transition"
                      >
                        <div className="flex items-center gap-4">
                          <div className="bg-medguard-100 text-medguard-700 h-12 w-12 rounded-full flex items-center justify-center shadow-inner">
                            <User size={20} />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800">{appointment.user}</div>
                            <div className="text-sm text-gray-500">{appointment.status}</div>
                          </div>
                        </div>
        
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-medguard-600 font-medium">{appointment.time}</span>
                          <div className="flex gap-2">
      
                          </div>
                        </div>
                      </div>
                    ) 
                  )
                ) : (
                  <div className="text-center py-8">
                    <h3 className="font-medium text-lg">No upcoming appointments</h3>
                    <p className="text-gray-500 text-sm">You're all clear for now</p>
                  </div>
                )}
        
              </TabsContent>

      </Tabs>
    </div>
  );
};

const AppointmentCard = ({
  appointment,
  onReschedule,
  onStartCall,
  onViewPatient
}) => {
  const statusColors = {
    upcoming: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
    rescheduled: "bg-amber-100 text-amber-800"
  };

  const formattedDate = new Date(appointment.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle>{appointment.patientName}</CardTitle>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[appointment.status] || 'bg-gray-100 text-gray-800'}`}>
            {appointment.status?.charAt(0).toUpperCase() + appointment.status?.slice(1)}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="mr-2 h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="mr-2 h-4 w-4" />
            <span>{appointment.time}</span>
          </div>
          <div className="text-sm mt-2">
            <span className="font-medium">Reason:</span> {appointment.reason}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewPatient(appointment.patientId)}
          >
            View Patient
          </Button>

          {appointment.status === "upcoming" && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onReschedule(appointment._id)}
              >
                Reschedule
              </Button>

              <Button
                variant="default"
                size="sm"
                className="bg-medguard-500 hover:bg-medguard-600"
                onClick={() => onStartCall(appointment._id)}
              >
                <Video className="mr-2 h-4 w-4" />
                Start Call
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorAppointments;
