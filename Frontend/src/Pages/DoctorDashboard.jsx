import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Users, Activity, User, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
// import useAuth from "@/hooks/useAuth";
import { useSelector,useDispatch } from "react-redux";

const DoctorDashboard = () => {
  const {doctor}=useSelector((state)=>state.doctor);
//   const { user } = useAuth();
  const doctorName = name || "Dr. John Doe";
  const [appointments, setAppointments] = useState([]);
  const [status, setStatus] = useState();
  const getappointement=async()=>{
    try {
      const response=await axios.post('http://localhost:3000/doctors/getallappointments',{doctorId:doctor._id});
      setAppointments(response.data.appointment);
    } catch (error) {
      console.log(error); 
    }
  }

  const handlestatus=async(id,status)=>{
    try {
      const response=await axios.post('http://localhost:3000/doctors/updatestatus',{appointmentId:id,status:status});
      getappointement();
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>{
    getappointement();
  },[])
  useEffect(()=>{
    console.log(appointments);
  },[])
  

  const [stats] = useState({
    totalPatients: 256,
    todayAppointments: 8,
    upcomingAppointments: 12,
    weeklyVisits: [12, 8, 10, 9, 7, 5, 0],
    upcomingAppointmentsList: [
      { id: 1, patient: "Emily Johnson", time: "10:00 AM", reason: "Headache and fever" },
      { id: 2, patient: "Robert Wilson", time: "11:30 AM", reason: "Skin rash evaluation" },
      { id: 3, patient: "Jennifer Davis", time: "01:15 PM", reason: "Annual checkup" },
      { id: 4, patient: "Michael Brown", time: "03:00 PM", reason: "Follow-up for hypertension" },
    ]
  });

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold">Welcome, {doctorName}</h1>
        <p className="text-gray-500">
          Today is{" "}
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
      <Card className="lg:col-span-2">
  <CardHeader>
    <CardTitle className="text-xl font-semibold">Today's Schedule</CardTitle>
  </CardHeader>
  <CardContent>
    <Tabs defaultValue="upcoming">
      <TabsList className="bg-medguard-50 p-1 rounded-md">
        <TabsTrigger
          value="upcoming"
          className="data-[state=active]:bg-medguard-500 data-[state=active]:text-white rounded-md px-4 py-1 text-sm"
        >
          Upcoming
        </TabsTrigger>
        <TabsTrigger
          value="completed"
          className="data-[state=active]:bg-medguard-500 data-[state=active]:text-white rounded-md px-4 py-1 text-sm"
        >
          Completed
        </TabsTrigger>
      </TabsList>

      <TabsContent value="upcoming" className="space-y-4 mt-6">
        {appointments.length > 0 ? (
          appointments.map((appointment) =>
            appointment.status === "pending" ? (
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
                      onClick={()=>{handlestatus(appointment._id,"approved")}}

                    >
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-600 text-red-700 hover:bg-red-50"
                      // onClick={() => console.log('Rejected', appointment._id)}
                      onClick={()=>{handlestatus(appointment._id,"rejected")}}
                      // onClick
                    >
                      Reject
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
        <div className="text-center py-8">
          <h3 className="font-medium text-lg">No completed appointments</h3>
          <p className="text-gray-500 text-sm">
            You haven't had any appointments today yet
          </p>
        </div>
      </TabsContent>
    </Tabs>
  </CardContent>
</Card>
      </div>
    </div>
  );
};

export default DoctorDashboard;
