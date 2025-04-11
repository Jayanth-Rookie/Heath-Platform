import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "lucide-react";

const DoctorSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [fees, setFees] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [workdays, setWorkdays] = useState(["monday", "tuesday", "wednesday", "thursday", "friday"]);
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const specializations = [
    "Cardiology",
    "Dermatology",
    "Endocrinology",
    "Gastroenterology",
    "Neurology",
    "Obstetrics and Gynecology",
    "Oncology",
    "Ophthalmology",
    "Orthopedics",
    "Pediatrics",
    "Psychiatry",
    "Pulmonology",
    "Radiology",
    "Urology"
  ];

  const toggleWorkday = (day) => {
    if (workdays.includes(day)) {
      setWorkdays(workdays.filter(d => d !== day));
    } else {
      setWorkdays([...workdays, day]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords do not match",
        description: "Please make sure your passwords match.",
      });
      return; // Stop here if passwords don't match
    }
    
    if (!specialization) {
      toast({
        variant: "destructive",
        title: "Specialization required",
        description: "Please select your medical specialization.",
      });
      return;
    }
    
    if (!fees || isNaN(Number(fees)) || Number(fees) <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid fee amount",
        description: "Please enter a valid consultation fee.",
      });
      return;
    }
  
    try {
      setIsLoading(true);
      
      // Create timings object based on workdays
      const timings = {
        monday: { start: startTime, end: endTime, available: workdays.includes("monday") },
        tuesday: { start: startTime, end: endTime, available: workdays.includes("tuesday") },
        wednesday: { start: startTime, end: endTime, available: workdays.includes("wednesday") },
        thursday: { start: startTime, end: endTime, available: workdays.includes("thursday") },
        friday: { start: startTime, end: endTime, available: workdays.includes("friday") },
        saturday: { start: startTime, end: endTime, available: workdays.includes("saturday") },
        sunday: { start: startTime, end: endTime, available: workdays.includes("sunday") },
      };
      
      const doctorData = {
        email,
        password,
        firstName,
        lastName,
        username: `${firstName} ${lastName}`,
        phone,
        address,
        specialization,
        fees: Number(fees),
        timings,
        role: "doctor"
      };
      
      const response = await axios.post('http://localhost:3000/doctors/signup', doctorData);
      console.log('Response: ', response);
      
      if (response.status === 200) {
        console.log('Doctor account created:', response.data.doctor.username);
        const { token, doctor } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("medguard_user", JSON.stringify(doctor));
        
        toast({
          title: "Account created successfully",
          description: "Welcome to Medguard Doctor Portal!",
        });
        
        navigate("/doctor");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: error.response.data.message || "Doctor with this email already exists",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: "Something went wrong. Please try again.",
        });
        console.error("Signup error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="hidden md:flex md:w-1/2 bg-medguard-500 flex-col justify-center items-center text-white p-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center">
            <span className="text-medguard-500 font-bold text-xl">M</span>
          </div>
          <span className="text-2xl font-bold">Medguard</span>
        </div>
        <h1 className="text-3xl font-bold mb-6">Join Our Doctor Network</h1>
        <p className="text-lg mb-8 text-center max-w-md">
          Create an account to start providing healthcare services through our platform and reach more patients.
        </p>
        <div className="w-full max-w-md bg-white/10 rounded-xl p-6 backdrop-blur-sm">
          <h2 className="text-xl font-medium mb-4">Benefits for Doctors</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <div className="h-5 w-5 rounded-full bg-white mt-0.5 flex items-center justify-center text-medguard-500 text-xs font-bold">✓</div>
              <span>Expand your patient base through our platform</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-5 w-5 rounded-full bg-white mt-0.5 flex items-center justify-center text-medguard-500 text-xs font-bold">✓</div>
              <span>Manage appointments and patient records easily</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-5 w-5 rounded-full bg-white mt-0.5 flex items-center justify-center text-medguard-500 text-xs font-bold">✓</div>
              <span>Conduct virtual consultations through video calls</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6">
        <div className="md:hidden flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-full bg-medguard-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <span className="text-xl font-bold">Medguard</span>
        </div>
        
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-1">Doctor Registration</h1>
          <p className="text-gray-500 mb-6">Complete your profile to join Medguard</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm hover:border-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"

                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm hover:border-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"

                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm hover:border-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"

              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm hover:border-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"

              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm hover:border-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"

                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm hover:border-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"

                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Clinic/Hospital Address</Label>
              <Input 
                id="address" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm hover:border-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"

              />
            </div>
            
            <div className="space-y-2 w-full max-w-md">
  <Label htmlFor="specialization" className="text-sm font-medium">
    Specialization
  </Label>
  <Select value={specialization} onValueChange={setSpecialization} required>
    <SelectTrigger
      id="specialization"
      className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm hover:border-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
    >
      <SelectValue placeholder="Select your specialization" />
    </SelectTrigger>
    <SelectContent className="rounded-md border border-gray-200 bg-white shadow-lg">
      {specializations.map((spec) => (
        <SelectItem
          key={spec}
          value={spec}
          className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"

        >
          {spec}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>

            
            <div className="space-y-2">
              <Label htmlFor="fees">Consultation Fee ($)</Label>
              <Input 
                id="fees" 
                type="number" 
                min="1"
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                required
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm hover:border-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"

              />
            </div>
            
            <div className="space-y-2">
              <Label>Availability</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input 
                    id="startTime" 
                    type="time" 
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm hover:border-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"

                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input 
                    id="endTime" 
                    type="time" 
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm hover:border-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"

                  />
                </div>
              </div>
              
              <div className="mt-2">
                <Label>Working Days</Label>
                <div className="grid grid-cols-7 gap-1 mt-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                    const dayKey = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'][index];
                    const isSelected = workdays.includes(dayKey);
                    
                    return (
                      <button
                        key={day}
                        type="button"
                        className={`p-2 text-xs font-medium rounded-md transition-colors ${
                          isSelected 
                            ? 'bg-medguard-100 text-medguard-700 border border-medguard-200' 
                            : 'bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200'
                        }`}
                        onClick={() => toggleWorkday(dayKey)}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-medguard-500 hover:bg-medguard-600"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Creating account...
                </span>
              ) : (
                "Register as Doctor"
              )}
            </Button>
            
            <p className="text-center text-sm text-gray-500">
              Already have an account? {" "}
              <Link to="/login" className="text-medguard-500 hover:underline font-medium">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DoctorSignup;