import { useState,useRef, useEffect } from "react";
import { ArrowRight, Calendar, FileText, Heart, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import DocumentChat from "@/components/DocumentChat";
import { use } from "react";
import { useNavigate } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {alertslice} from "../Redux/features/alertslice";
import { setLocation } from "../Redux/features/locationslice";
const DashboardCard = ({ title, description, icon, linkTo, linkText }) => (
  <Card className="h-full">
    <CardHeader className="flex flex-row items-start space-y-0 gap-4">
      <div className="p-2 rounded-lg bg-medguard-50 text-medguard-500">
        {icon}
      </div>
      <div className="space-y-1">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
    </CardHeader>
    <CardContent>
      <Link to={linkTo} className="text-medguard-500 font-medium hover:underline flex items-center gap-1">
        {linkText} <ArrowRight size={16} />
      </Link>
    </CardContent>
  </Card>
);

const Index = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [bp, setBp] = useState("120/80");
  const [heartRate, setHeartRate] = useState("72");
  const [weight, setWeight] = useState("165");
  // const [location, setLocation] = useState("New York");
  const {location}=useSelector(state=>state.location);
  const toggleEdit = () => setEditMode(!editMode);
  const {user}=useSelector(state=>state.user);

  const getBpStatus = () => {
    const [sys, dia] = bp.split("/").map(Number);
    if (sys >= 90 && sys <= 120 && dia >= 60 && dia <= 80) return "Normal";
    return "Not Normal";
  };

  const getHeartRateStatus = () => {
    const hr = parseInt(heartRate);
    return hr >= 60 && hr <= 100 ? "Normal" : "Not Normal";
  };

  const getWeightStatus = () => {
    const wt = parseInt(weight);
    return wt >= 100 && wt <= 200 ? "Normal" : "Not Normal";
  };

  useEffect(()=>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
        const Location={
          ltd:position.coords.latitude,
          lng:position.coords.longitude
        }
          dispatch(setLocation(Location));
          console.log(location);
      })
        
    }
  },[])
  useEffect(()=>{
    console.log(location);
    
  },[location])
  useEffect(()=>{
    console.log('Current User : ',user);
    console.log('Current User : ',user.username);
  },[])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back!</h1>
          <p className="text-gray-500">Here's an overview of your health journey</p>
        </div>
        <Button asChild className="bg-medguard-500 hover:bg-medguard-600">
          <Link to="/book-doctor"
            state={{ location }}
          >Find Doctors</Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Upload Documents"
          description="Add your medical records for AI analysis"
          icon={<Upload size={24} />}
          linkTo="/reports"
          linkText="Upload now"
        />
        <DashboardCard
          title="Mental Support"
          description="Chat with our AI companion for wellness tips"
          icon={<Heart size={24} />}
          linkTo="/mental-health"
          linkText="Start chat"
        />
        <DashboardCard
          title="Upcoming Appointments"
          description="View and manage your doctor appointments"
          icon={<Calendar size={24} />}
          linkTo="/all-appointments"
          linkText="See appointments"
        />
      </div>

      <Card className="h-auto">
        <CardContent className="p-0 m-0 h-full">
          <DocumentChat />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="flex flex-row justify-between items-start">
              <div>
                <CardTitle>Health Summary</CardTitle>
                <CardDescription>Your latest health metrics and insights</CardDescription>
              </div>
              <Button variant="none" size="sm" onClick={toggleEdit}>
                {editMode ? "Save" : "Edit"}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                {/* Blood Pressure */}
                <div className="p-4 bg-secondary rounded-lg">
                  <div className="text-sm text-gray-500">Blood Pressure</div>
                  {editMode ? (
                    <Input value={bp} onChange={(e) => setBp(e.target.value)} />
                  ) : (
                    <div className="text-2xl font-bold">{bp}</div>
                  )}
                  <div className={`text-xs ${getBpStatus() === "Normal" ? "text-medguard-500" : "text-red-500"}`}>
                    {getBpStatus()}
                  </div>
                </div>

                {/* Heart Rate */}
                <div className="p-4 bg-secondary rounded-lg">
                  <div className="text-sm text-gray-500">Heart Rate</div>
                  {editMode ? (
                    <Input value={heartRate} onChange={(e) => setHeartRate(e.target.value)} />
                  ) : (
                    <div className="text-2xl font-bold">{heartRate} bpm</div>
                  )}
                  <div className={`text-xs ${getHeartRateStatus() === "Normal" ? "text-medguard-500" : "text-red-500"}`}>
                    {getHeartRateStatus()}
                  </div>
                </div>

                {/* Weight */}
                <div className="p-4 bg-secondary rounded-lg">
                  <div className="text-sm text-gray-500">Weight</div>
                  {editMode ? (
                    <Input value={weight} onChange={(e) => setWeight(e.target.value)} />
                  ) : (
                    <div className="text-2xl font-bold">{weight} lbs</div>
                  )}
                  <div className={`text-xs ${getWeightStatus() === "Normal" ? "text-medguard-500" : "text-red-500"}`}>
                    {getWeightStatus()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Recent Documents</CardTitle>
            <CardDescription>Your recently uploaded medical reports</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Link to="/reports" className="block p-4 hover:bg-gray-50 border-b">
              <div className="flex items-center gap-3">
                <FileText size={16} />
                <div>
                  <div className="text-sm font-medium">Blood Test Results</div>
                  <div className="text-xs text-gray-500">Uploaded 2 days ago</div>
                </div>
              </div>
            </Link>
            <Link to="/reports" className="block p-4 hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <FileText size={16} />
                <div>
                  <div className="text-sm font-medium">X-Ray Report</div>
                  <div className="text-xs text-gray-500">Uploaded 1 week ago</div>
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;