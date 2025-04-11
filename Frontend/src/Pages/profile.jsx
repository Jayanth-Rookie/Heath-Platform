import { useState, useEffect } from 'react';
import { User, Settings, LogOut, Mail, Edit, Camera } from 'lucide-react';
import { useSelector } from 'react-redux';

export default function ProfilePage() {
  const {user}=useSelector((state)=>state.user);
  // Simulating the data that would be passed from your authentication flow
  const [userData, setUserData] = useState({
    email: user.email,
    username: user.username,
    joinDate: new Date().toLocaleDateString(),
    profileImage: null
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    username: userData.username,
    email: userData.email
  });

  useEffect(() => {
    // Simulate loading data - in a real app, this would be replaced with 
    // your actual data loading logic using the authenticated user info
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const [isLoading, setIsLoading] = useState(true);

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      setUserData({
        ...userData,
        username: editForm.username,
        email: editForm.email
      });
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse-slow text-primary">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto pt-8 px-4">
        <div className="bg-card rounded-lg shadow-lg overflow-hidden animate-fade-in">
          
          {/* Header/Banner */}
          <div className="h-32 bg-gradient-to-r from-primary-medguard-500 to-primary-medguard-600"></div>
          
          {/* Profile Info Section */}
          <div className="relative px-6 pb-6">
            {/* Profile Image */}
            <div className="absolute -top-16 left-6">
              <div className="w-32 h-32 rounded-full bg-medguard-100 border-4 border-card flex items-center justify-center text-medguard-500 relative">
                {userData.profileImage ? 
                  <img src={userData.profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" /> :
                  <User size={48} />
                }
                <button className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full">
                  <Camera size={16} />
                </button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-end pt-4 space-x-2">
              <button 
                onClick={handleEditToggle}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary-medguard-600 transition-colors"
              >
                {isEditing ? 'Save' : 'Edit Profile'}
                <Edit size={16} />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-muted text-muted-foreground hover:bg-muted/80 transition-colors">
                Settings
                <Settings size={16} />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors">
                Logout
                <LogOut size={16} />
              </button>
            </div>

            {/* Profile Content */}
            <div className="mt-16">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-foreground">Username</label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      value={editForm.username}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-background border border-input rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={editForm.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-background border border-input rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{userData.username}</h1>
                  <div className="flex items-center mt-2 text-muted-foreground">
                    <Mail size={16} className="mr-2" />
                    <span>{userData.email}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Member since: {userData.joinDate}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Additional Profile Sections */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
          <div className="bg-card rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Activity</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>No recent activity to display.</p>
            </div>
          </div>
          
          <div className="bg-card rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Account Information</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Account Type</span>
                <span className="font-medium text-foreground">Standard</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <span className="font-medium text-green-500">Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Login</span>
                <span className="font-medium text-foreground">Today</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}