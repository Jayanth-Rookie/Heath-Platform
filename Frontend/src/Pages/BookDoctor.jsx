import { useEffect, useState } from 'react';
import { Search, MapPin, Filter } from 'lucide-react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const DoctorCard = ({ doctor, onBookAppointment }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border p-5">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden">
          <img 
            src="/api/placeholder/80/80" 
            alt={doctor.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-1 flex-1">
          <h3 className="font-semibold text-lg">{doctor.firstName}</h3>
          <p className="text-medguard-500">{doctor.specialization}</p>
          <div className="flex items-center text-sm text-gray-600">
            <span className="flex items-center">
              ★ {doctor.rating || "4.5"}
            </span>
            <span className="mx-2">•</span>
            <span>{doctor.distance || "Nearby"}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="mx-2">Phone:</span>
            <span>{doctor.phone || "-"}</span>
          </div>
        </div>
      </div>
      <div className="mt-5 pt-5 border-t">
        <div className="flex justify-between mb-4">
          <span className="text-gray-600">Consultation Fee</span>
          <span className="font-medium">Rs. {doctor.fees || "$120"}</span>
        </div>
        <button 
          onClick={() => onBookAppointment(doctor)}
          className="w-full py-2 px-4 bg-medguard-500 hover:bg-medguard-600 text-white rounded-md transition-colors"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

const Navbar = () => <nav className="bg-white shadow-sm p-4">MedGuard Navbar</nav>;
const Footer = () => <footer className="bg-gray-100 p-6 text-center">© 2025 MedGuard</footer>;

const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => onOpenChange(false)}>
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

const DialogContent = ({ children, className }) => <div className={className}>{children}</div>;
const DialogHeader = ({ children }) => <div className="mb-4">{children}</div>;
const DialogTitle = ({ children }) => <h2 className="text-xl font-semibold">{children}</h2>;

const Input = ({ id, placeholder, className, value, onChange }) => (
  <input
    id={id}
    placeholder={placeholder}
    className={`w-full p-2 border rounded-md ${className}`}
    value={value}
    onChange={onChange}
  />
);

const Button = ({ onClick, className, disabled = false, children, variant = "default" }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 rounded-md ${
      variant === 'outline' 
        ? 'border border-gray-300 text-gray-700 hover:bg-gray-50' 
        : 'bg-medguard-500 text-white hover:bg-medguard-600'
    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className || ''} transition-colors`}
  >
    {children}
  </button>
);

const Checkbox = ({ id, checked, onCheckedChange }) => (
  <input
    type="checkbox"
    id={id}
    checked={checked}
    onChange={e => onCheckedChange && onCheckedChange(e.target.checked)}
    className="text-medguard-500 focus:ring-medguard-500"
  />
);

const Label = ({ htmlFor, className, children }) => (
  <label htmlFor={htmlFor} className={className}>{children}</label>
);

const Select = ({ children, value, onValueChange }) => {
  return (
    <select 
      className="w-full p-2 border rounded-md" 
      value={value} 
      onChange={e => onValueChange && onValueChange(e.target.value)}
    >
      {children}
    </select>
  );
};

const SelectTrigger = ({ id, children }) => <div id={id}>{children}</div>;
const SelectContent = ({ children }) => <>{children}</>;
const SelectValue = ({ placeholder }) => <span>{placeholder}</span>;
const SelectItem = ({ value, children }) => <option value={value}>{children}</option>;

const Skeleton = ({ className }) => <div className={`bg-gray-200 animate-pulse rounded ${className}`}></div>;

const CalendarComponent = ({ mode, selected, onSelect, disabled, className }) => {
  const days = Array.from({ length: 31 }, (_, i) => new Date(2025, 3, i + 1));
  
  return (
    <div className={`border rounded p-4 ${className || ''}`}>
      <div className="grid grid-cols-7 gap-1">
        {days.slice(0, 28).map((date, i) => (
          <button
            key={i}
            className={`p-2 rounded ${
              selected && date.toDateString() === selected.toDateString()
                ? 'bg-medguard-500 text-white'
                : 'hover:bg-gray-100'
            }`}
            disabled={disabled ? disabled(date) : false}
            onClick={() => onSelect(date)}
          >
            {date.getDate()}
          </button>
        ))}
      </div>
    </div>
  );
};

// Default doctors data to use if API fails
const FALLBACK_DOCTORS = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    speciality: "Cardiologist",
    rating: 4.8,
    distance: "2.3 miles away",
    fee: "$150",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    speciality: "Pediatrician",
    rating: 4.9,
    distance: "3.1 miles away",
    fee: "$120",
  }
];

const SearchState = {
  INITIAL: 'INITIAL',
  LOADING: 'LOADING',
  RESULTS: 'RESULTS'
};

const BookDoctor = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [selectedSpeciality, setSelectedSpeciality] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [selectedTime, setSelectedTime] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [searchState, setSearchState] = useState(SearchState.INITIAL);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const {location} = useSelector(state => state.location) || {};
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const {user}=useSelector(state=>state.user);

  // Ensure doctors is always an array
  const ensureDoctorsArray = (data) => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (data.doctors && Array.isArray(data.doctors)) return data.doctors;
    console.warn('Received unexpected data format:', data);
    return [];
  };

  // Fetch doctors based on location
  const fetchDoctors = async (locationParam) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        'http://localhost:3000/users/getdoctor', 
        { Location: locationParam || location },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      console.log('Doctor data:', response.data);
      const doctorsArray = ensureDoctorsArray(response.data);
      setDoctors(doctorsArray);
      return doctorsArray;
    } catch (err) {
      console.error('Error fetching doctors:', err);
      setError('Failed to fetch doctors. Please try again.');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchDoctors();
  }, [location]);

  useEffect(() => {
    console.log('current booking user : ',user);
    console.log(user._id);
    
  }, []);

  // Handle search functionality
  const handleSearch = async () => {
    setSearchState(SearchState.LOADING);
    
    try {
      // Use the location from input or from redux state
      const searchLocation = locationInput || location;
      
      // Fetch fresh data with the search parameters
      const doctorsData = await fetchDoctors(searchLocation);
      
      // Filter the results based on search criteria
      const filtered = doctorsData.filter(doctor => {
        const matchesSearch = searchTerm ? 
          ((doctor.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
          (doctor.speciality?.toLowerCase() || '').includes(searchTerm.toLowerCase())) : true;
        
        const matchesSpeciality = selectedSpeciality ? 
          doctor.speciality === selectedSpeciality : true;
        
        return matchesSearch && matchesSpeciality;
      });
      
      setFilteredDoctors(filtered);
      setSearchState(SearchState.RESULTS);
    } catch (err) {
      console.error('Search error:', err);
      setError('An error occurred during search. Please try again.');
      setSearchState(SearchState.INITIAL);
    }
  };

  const handleBookAppointment = async(doctor) => {
   
    setSelectedDoctor(doctor);
    setSelectedDate(undefined);
    setSelectedTime('');
    setBookingSuccess(false);
    setDoctor(doctor);
  };

  const handleConfirmBooking =async (doctor) => {
    if (selectedDate && selectedTime) {
      // Here you would typically make an API call to book the appointment
      console.log('Booking appointment with:', selectedDoctor);
      console.log('Date:', selectedDate);
      console.log('Time:', selectedTime);
      console.log('Booking appointment with:', doctor);
      try {
        const responce=await axios.post('http://localhost:3000/users/bookappointment',{
          userId:user._id,
          doctorId:doctor._id,
          date:selectedDate,
          time:selectedTime
          
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
        console.log(responce);
        
      } catch (error) {
        console.log(error);
      }
      // For now, we'll just show the success message
      setBookingSuccess(true);
    }
  };

  const handleReset = () => {
    setSearchState(SearchState.INITIAL);
    setSearchTerm('');
    setLocationInput('');
    setSelectedSpeciality('');
  };

  // Safely get specialties
  const getSpecialties = () => {
    try {
      if (!Array.isArray(doctors)) return [];
      return [...new Set(doctors.map(doctor => doctor.speciality).filter(Boolean))];
    } catch (err) {
      console.error('Error extracting specialties:', err);
      return [];
    }
  };

  const specialties = getSpecialties();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Book a Doctor</h1>
            <p className="text-gray-600">Find and book appointments with top healthcare professionals near you.</p>
          </div>
          
          {/* Initial Search UI */}
          {searchState === SearchState.INITIAL && (
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border">
              <h2 className="text-xl font-semibold mb-6">Find Doctors Near You</h2>
              
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
                  {error}
                </div>
              )}
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="search" className="mb-2 block">Doctor name or specialty</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input 
                        id="search"
                        placeholder="e.g. Cardiologist, Dr. Smith" 
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="location" className="mb-2 block">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input 
                        id="location"
                        placeholder={location || "City or Zip code"} 
                        className="pl-10"
                        value={locationInput}
                        onChange={(e) => setLocationInput(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="specialty" className="mb-2 block">Specialty (Optional)</Label>
                  <Select value={selectedSpeciality} onValueChange={setSelectedSpeciality}>
                    <SelectItem value="">Any specialty</SelectItem>
                    {specialties.map(specialty => (
                      <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                    ))}
                  </Select>
                </div>
                
                <Button 
                  onClick={handleSearch} 
                  className="w-full bg-medguard-500 hover:bg-medguard-600 text-lg py-3"
                  disabled={isLoading}
                >
                  {isLoading ? "Searching..." : "Search Doctors"}
                </Button>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">
                  Need immediate care? Call emergency services at <span className="font-semibold">911</span>
                </p>
              </div>
            </div>
          )}
          
          {/* Loading State */}
          {searchState === SearchState.LOADING && (
            <div className="max-w-5xl mx-auto">
              <div className="mb-6 flex items-center justify-between">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-10 w-32" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden border p-5">
                    <div className="flex items-center gap-4">
                      <Skeleton className="w-20 h-20 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-1/4" />
                      </div>
                    </div>
                    <div className="mt-5 pt-5 border-t">
                      <div className="flex justify-between mb-4">
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-4 w-1/4" />
                      </div>
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Results */}
          {searchState === SearchState.RESULTS && (
            <div>
              <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
                <div>
                  <h2 className="text-xl font-semibold">
                    {filteredDoctors.length} {filteredDoctors.length === 1 ? 'Doctor' : 'Doctors'} Found
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    {selectedSpeciality ? `Specialty: ${selectedSpeciality}` : 'All specialties'}
                    {locationInput || location ? ` • Near: ${locationInput || location}` : ''}
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <Button variant="outline" onClick={handleReset} className="">
                    New Search
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="lg:hidden"
                    onClick={() => setIsFilterOpen(true)}
                  >
                    <Filter size={18} />
                    <span className="ml-2">Filter</span>
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Filters - Desktop */}
                <div className="hidden lg:block">
                  <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h2 className="font-semibold text-lg mb-4">Filters</h2>
                    
                    <div className="space-y-5">
                      <div>
                        <h3 className="font-medium mb-2">Speciality</h3>
                        <div className="space-y-2">
                          {specialties.map((specialty) => (
                            <div key={specialty} className="flex items-center">
                              <Checkbox 
                                id={`specialty-${specialty}`} 
                                checked={selectedSpeciality === specialty}
                                onCheckedChange={() => setSelectedSpeciality(selectedSpeciality === specialty ? '' : specialty)}
                              />
                              <Label htmlFor={`specialty-${specialty}`} className="ml-2 text-sm">
                                {specialty}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Distance</h3>
                        <Select value="" onValueChange={() => {}}>
                          <SelectItem value="1">Within 1 mile</SelectItem>
                          <SelectItem value="5">Within 5 miles</SelectItem>
                          <SelectItem value="10">Within 10 miles</SelectItem>
                          <SelectItem value="25">Within 25 miles</SelectItem>
                        </Select>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Price Range</h3>
                        <Select value="" onValueChange={() => {}}>
                          <SelectItem value="budget">$0 - $100</SelectItem>
                          <SelectItem value="mid">$100 - $150</SelectItem>
                          <SelectItem value="premium">$150+</SelectItem>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Doctor Cards */}
                <div className="lg:col-span-3">
                  {filteredDoctors.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredDoctors.map((doctor, index) => (
                        <DoctorCard 
                          key={doctor._id || doctor.id || index} 
                          doctor={doctor} 
                          onBookAppointment={handleBookAppointment} 
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
                      <h3 className="text-lg font-semibold mb-2">No doctors found</h3>
                      <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
                      <Button onClick={handleReset} variant="outline" className="">Start a new search</Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Mobile Filters Dialog */}
          <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Filters</DialogTitle>
              </DialogHeader>
              <div className="space-y-5">
                <div>
                  <h3 className="font-medium mb-2">Speciality</h3>
                  <div className="space-y-2">
                    {specialties.map((specialty) => (
                      <div key={specialty} className="flex items-center">
                        <Checkbox 
                          id={`specialty-mobile-${specialty}`} 
                          checked={selectedSpeciality === specialty}
                          onCheckedChange={() => {
                            setSelectedSpeciality(selectedSpeciality === specialty ? '' : specialty);
                            setIsFilterOpen(false);
                          }}
                        />
                        <Label htmlFor={`specialty-mobile-${specialty}`} className="ml-2 text-sm">
                          {specialty}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Distance</h3>
                  <Select value="" onValueChange={() => {}}>
                    <SelectItem value="1">Within 1 mile</SelectItem>
                    <SelectItem value="5">Within 5 miles</SelectItem>
                    <SelectItem value="10">Within 10 miles</SelectItem>
                    <SelectItem value="25">Within 25 miles</SelectItem>
                  </Select>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Price Range</h3>
                  <Select value="" onValueChange={() => {}}>
                    <SelectItem value="budget">$0 - $100</SelectItem>
                    <SelectItem value="mid">$100 - $150</SelectItem>
                    <SelectItem value="premium">$150+</SelectItem>
                  </Select>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          {/* Appointment Booking Dialog */}
          <Dialog open={!!selectedDoctor} onOpenChange={(open) => !open && setSelectedDoctor(null)}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Book Appointment</DialogTitle>
              </DialogHeader>
              
              {selectedDoctor && !bookingSuccess && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                      <img 
                        src="/api/placeholder/64/64" 
                        alt={selectedDoctor.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{selectedDoctor.name}</h3>
                      <p className="text-medguard-500">{selectedDoctor.speciality}</p>
                      <p className="text-sm text-gray-600">Fee: {selectedDoctor.fee || "$120"}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Select Date</h3>
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => 
                        date < new Date() || 
                        date > new Date(new Date().setDate(new Date().getDate() + 30))
                      }
                      className="rounded-md border"
                    />
                  </div>
                  
                  {selectedDate && (
                    <div>
                      <h3 className="font-medium mb-2">Select Time</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM'].map((time) => (
                          <button
                            key={time}
                            className={`p-2 text-sm rounded-md ${
                              selectedTime === time 
                                ? 'bg-medguard-500 text-white' 
                                : 'bg-gray-100 hover:bg-gray-200'
                            } transition-colors`}
                            onClick={() => setSelectedTime(time)}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <Button
                    onClick={()=>{handleConfirmBooking(doctor)}}
                    disabled={!selectedDate || !selectedTime}
                    className="w-full bg-medguard-500 hover:bg-medguard-600"
                    variant="default"
                  >
                    Confirm Booking
                  </Button>
                </div>
              )}
              
              {selectedDoctor && bookingSuccess && (
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-medguard-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="h-8 w-8 text-medguard-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Appointment Booked!</h3>
                  <p className="text-gray-600 mb-4">
                    Your appointment with {selectedDoctor.name} is confirmed for {selectedDate?.toLocaleDateString()} at {selectedTime}.
                  </p>
                  <Button 
                    onClick={() => setSelectedDoctor(null)} 
                    className="bg-medguard-500 hover:bg-medguard-600"
                    variant="default"
                  >
                    Done
                  </Button>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookDoctor;