import { useState, useEffect } from "react";
import { User, Settings, LogOut, Mail, Edit, MapPin, Clock, Calendar, Phone, DollarSign, AlertCircle, CheckCircle } from "lucide-react";

const Toast = ({ message, variant = "default", onClose }) => {
  const bgColor = variant === "destructive" ? "bg-red-500" : "bg-green-500";
  
  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-4 py-3 rounded-md shadow-lg flex items-center z-50`}>
      {variant === "destructive" ? <AlertCircle size={18} className="mr-2" /> : <CheckCircle size={18} className="mr-2" />}
      <span>{message}</span>
      <button onClick={onClose} className="ml-3 text-white hover:text-gray-200">×</button>
    </div>
  );
};

const Button = ({ children, onClick, className, variant = "default", disabled = false }) => {
  const baseClasses = "px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  let variantClasses = "bg-medguard-500 text-white hover:bg-medguard-600 focus:ring-medguard-500";
  if (variant === "outline") {
    variantClasses = "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-medguard-500";
  }
  
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${disabledClasses} ${className}`}
    >
      {children}
    </button>
  );
};

// Simple input component to replace the imported one
const Input = ({ id, name, type = "text", value, onChange, required = false, className, ...props }) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className={`w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm hover:border-gray-400 focus:border-medguard-500 focus:outline-none focus:ring-1 focus:ring-medguard-500 ${className}`}
      {...props}
    />
  );
};

// Simple label component to replace the imported one
const Label = ({ htmlFor, children, className }) => {
  return (
    <label 
      htmlFor={htmlFor} 
      className={`block text-sm font-medium text-gray-700 ${className}`}
    >
      {children}
    </label>
  );
};

// Simple select component to replace the imported one
const Select = ({ id, value, onChange, children, className }) => {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm hover:border-gray-400 focus:border-medguard-500 focus:outline-none focus:ring-1 focus:ring-medguard-500 ${className}`}
    >
      {children}
    </select>
  );
};

export  function DoctorProfile() {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [toast, setToast] = useState(null);

  // Mock doctor data - in production this would come from your auth/redux store
  const [doctorData, setDoctorData] = useState({
    firstName: "Sarah",
    lastName: "Johnson",
    username: "Sarah Johnson",
    email: "dr.sarah@medguard.com",
    phone: "+1 (555) 123-4567",
    address: "123 Medical Center Blvd, Suite 101, Boston, MA",
    specialization: "Cardiology",
    fees: 150,
    timings: {
      monday: { start: "09:00", end: "17:00", available: true },
      tuesday: { start: "09:00", end: "17:00", available: true },
      wednesday: { start: "09:00", end: "17:00", available: true },
      thursday: { start: "09:00", end: "17:00", available: true },
      friday: { start: "09:00", end: "17:00", available: true },
      saturday: { start: "10:00", end: "14:00", available: false },
      sunday: { start: "10:00", end: "14:00", available: false },
    },
    profileImage: null,
    joinDate: "January 15, 2023",
    patientCount: 187,
    appointmentsCompleted: 342,
    rating: 4.8
  });

  const [editForm, setEditForm] = useState({
    firstName: doctorData.firstName,
    lastName: doctorData.lastName,
    phone: doctorData.phone,
    email: doctorData.email,
    address: doctorData.address,
    fees: doctorData.fees,
    specialization: doctorData.specialization,
    startTime: doctorData.timings.monday.start,
    endTime: doctorData.timings.monday.end,
    workdays: Object.keys(doctorData.timings).filter(day => doctorData.timings[day].available)
  });

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

  useEffect(() => {
    // Simulate loading data from API
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const showToast = (message, variant = "default") => {
    setToast({ message, variant });
    setTimeout(() => setToast(null), 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value
    });
  };

  const toggleWorkday = (day) => {
    if (editForm.workdays.includes(day)) {
      setEditForm({
        ...editForm,
        workdays: editForm.workdays.filter(d => d !== day)
      });
    } else {
      setEditForm({
        ...editForm,
        workdays: [...editForm.workdays, day]
      });
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      const updatedTimings = {};
      Object.keys(doctorData.timings).forEach(day => {
        updatedTimings[day] = {
          start: editForm.startTime,
          end: editForm.endTime,
          available: editForm.workdays.includes(day)
        };
      });

      setDoctorData({
        ...doctorData,
        firstName: editForm.firstName,
        lastName: editForm.lastName,
        username: `${editForm.firstName} ${editForm.lastName}`,
        email: editForm.email,
        phone: editForm.phone,
        address: editForm.address,
        specialization: editForm.specialization,
        fees: Number(editForm.fees),
        timings: updatedTimings
      });

      showToast("Your profile has been successfully updated.");
    } else {
      // Initialize edit form with current data
      setEditForm({
        firstName: doctorData.firstName,
        lastName: doctorData.lastName,
        phone: doctorData.phone,
        email: doctorData.email,
        address: doctorData.address,
        fees: doctorData.fees,
        specialization: doctorData.specialization,
        startTime: doctorData.timings.monday.start,
        endTime: doctorData.timings.monday.end,
        workdays: Object.keys(doctorData.timings).filter(day => doctorData.timings[day].available)
      });
    }
    setIsEditing(!isEditing);
  };

  const handleLogout = () => {
    // Implement logout functionality without router navigation
    localStorage.removeItem("token");
    localStorage.removeItem("medguard_user");
    showToast("You have been successfully logged out.");
    // In a real app, you might use window.location.href or other approach
    console.log("User logged out");
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50 items-center justify-center">
        <div className="h-6 w-6 border-2 border-medguard-500 border-t-transparent rounded-full animate-spin mr-2"></div>
        <span className="text-medguard-500">Loading profile...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Toast notification */}
      {toast && (
        <Toast 
          message={toast.message} 
          variant={toast.variant} 
          onClose={() => setToast(null)} 
        />
      )}
      
      {/* Header Banner */}
      <div className="bg-medguard-500 h-48 md:h-56"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="p-6 relative">
            <div className="flex flex-col md:flex-row md:items-center">
              {/* Avatar */}
              <div className="flex-shrink-0 mb-4 md:mb-0">
                <div className="h-32 w-32 rounded-full bg-medguard-100 border-4 border-white flex items-center justify-center text-medguard-500 relative">
                  {doctorData.profileImage ? 
                    <img src={doctorData.profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" /> :
                    <User size={64} />
                  }
                </div>
              </div>
              
              <div className="md:ml-6 flex-1">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dr. {doctorData.username}</h1>
                    <p className="text-medguard-500 font-medium">{doctorData.specialization}</p>
                    
                    <div className="mt-2 flex items-center space-x-4">
                      <div className="flex items-center text-gray-600">
                        <Mail size={16} className="mr-1" />
                        <span className="text-sm">{doctorData.email}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Phone size={16} className="mr-1" />
                        <span className="text-sm">{doctorData.phone}</span>
                      </div>
                    </div>
                    
                    <div className="mt-2 flex items-center text-gray-600">
                      <MapPin size={16} className="mr-1 flex-shrink-0" />
                      <span className="text-sm">{doctorData.address}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 flex space-x-2">
                    <Button 
                      onClick={handleEditToggle}
                      className="bg-medguard-500 hover:bg-medguard-600 text-white"
                    >
                      {isEditing ? 'Save Changes' : 'Edit Profile'}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-gray-300 text-gray-700"
                      onClick={handleLogout}
                    >
                      <LogOut size={16} className="mr-1" />
                      Logout
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="border-t border-gray-200 bg-gray-50 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {/* <div className="p-6 text-center">
              <p className="text-gray-500 text-sm font-medium">Patients</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{doctorData.patientCount}</p>
            </div>
            <div className="p-6 text-center">
              <p className="text-gray-500 text-sm font-medium">Appointments</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{doctorData.appointmentsCompleted}</p>
            </div> */}
            <div className="p-6 text-center">
              <p className="text-gray-500 text-sm font-medium">Rating</p>
              <div className="flex items-center justify-center mt-1">
                <p className="text-3xl font-bold text-gray-900">{doctorData.rating}</p>
                <div className="text-yellow-400 ml-2">★★★★★</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Edit Form / Profile Details */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            {isEditing ? "Edit Profile Information" : "Doctor Profile Details"}
          </h2>
          
          {isEditing ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    name="firstName"
                    value={editForm.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    name="lastName"
                    value={editForm.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email" 
                    value={editForm.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    name="phone"
                    value={editForm.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Clinic/Hospital Address</Label>
                <Input 
                  id="address" 
                  name="address"
                  value={editForm.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="specialization">Specialization</Label>
                  <Select 
                    id="specialization"
                    value={editForm.specialization} 
                    onChange={(value) => setEditForm({...editForm, specialization: value})}
                  >
                    <option value="" disabled>Select your specialization</option>
                    {specializations.map((spec) => (
                      <option key={spec} value={spec}>
                        {spec}
                      </option>
                    ))}
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fees">Consultation Fee ($)</Label>
                  <Input 
                    id="fees" 
                    name="fees"
                    type="number" 
                    min="1"
                    value={editForm.fees}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Availability</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input 
                      id="startTime" 
                      name="startTime"
                      type="time" 
                      value={editForm.startTime}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="endTime">End Time</Label>
                    <Input 
                      id="endTime" 
                      name="endTime"
                      type="time" 
                      value={editForm.endTime}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="mt-2">
                  <Label>Working Days</Label>
                  <div className="grid grid-cols-7 gap-1 mt-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                      const dayKey = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'][index];
                      const isSelected = editForm.workdays.includes(dayKey);
                      
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
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-4">
                    <DollarSign className="text-medguard-500 mr-2" size={20} />
                    <h3 className="font-medium text-gray-900">Consultation Fee</h3>
                  </div>
                  <p className="text-3xl font-bold text-medguard-600">${doctorData.fees}</p>
                  <p className="text-sm text-gray-500 mt-1">Per appointment</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-4">
                    <Calendar className="text-medguard-500 mr-2" size={20} />
                    <h3 className="font-medium text-gray-900">Member Since</h3>
                  </div>
                  <p className="text-gray-700">{doctorData.joinDate}</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-4">
                  <Clock className="text-medguard-500 mr-2" size={20} />
                  <h3 className="font-medium text-gray-900">Working Hours</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-sm text-gray-600 mb-2">Available Days</h4>
                    <div className="flex flex-wrap gap-1">
                      {Object.keys(doctorData.timings).map((day) => {
                        const isAvailable = doctorData.timings[day].available;
                        const dayAbbr = day.slice(0, 3).charAt(0).toUpperCase() + day.slice(0, 3).slice(1);
                        
                        return (
                          <span
                            key={day}
                            className={`text-xs px-2 py-1 rounded-md font-medium ${
                              isAvailable 
                                ? 'bg-medguard-100 text-medguard-700 border border-medguard-200' 
                                : 'bg-gray-100 text-gray-400 border border-gray-200'
                            }`}
                          >
                            {dayAbbr}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-gray-600 mb-2">Hours</h4>
                    <p className="text-gray-700">
                      {doctorData.timings.monday.start} - {doctorData.timings.monday.end}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-4">
                  <MapPin className="text-medguard-500 mr-2" size={20} />
                  <h3 className="font-medium text-gray-900">Practice Location</h3>
                </div>
                <p className="text-gray-700">{doctorData.address}</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Upcoming Appointments Section */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Appointments</h2>
          
          <div className="text-center py-10">
            <div className="text-medguard-500 mb-3">
              <Calendar size={40} className="mx-auto opacity-50" />
            </div>
            <p className="text-gray-500">No upcoming appointments scheduled</p>
            <Button 
              className="mt-4 bg-medguard-500 hover:bg-medguard-600 text-white"
              onClick={() => showToast("This feature is coming soon!")}
            >
              View Appointment History
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorProfile;