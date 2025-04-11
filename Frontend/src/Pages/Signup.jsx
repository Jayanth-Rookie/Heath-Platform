import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

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
  
    try {
      setIsLoading(true);
      const userdata = {
        email,
        password,
        username: name,
      };
  
      const response = await axios.post('http://localhost:3000/users/signup', userdata);
      console.log('Response : ',response);
  
       if (response.status === 200) {
        console.log('User created:', response.data.user.username);
        const {token,user}=response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("medguard_user", JSON.stringify(response.data.user));
  
        toast({
          title: "Account created successfully",
          description: "Welcome to Medguard!",
        });
  
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert(error.response.data.message || "User Already Exists");
      } else {
        alert("Something went wrong. Please try again.");
      }} finally {
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
          <span className="text-2xl font-bold">MediConnect</span>
        </div>
        <h1 className="text-3xl font-bold mb-6">Join Medguard Today</h1>
        <p className="text-lg mb-8 text-center max-w-md">
          Create an account to access our suite of healthcare services tailored just for you.
        </p>
        <div className="w-full max-w-md bg-white/10 rounded-xl p-6 backdrop-blur-sm">
          <h2 className="text-xl font-medium mb-4">What You'll Get</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <div className="h-5 w-5 rounded-full bg-white mt-0.5 flex items-center justify-center text-medguard-500 text-xs font-bold">✓</div>
              <span>Personalized health dashboard</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-5 w-5 rounded-full bg-white mt-0.5 flex items-center justify-center text-medguard-500 text-xs font-bold">✓</div>
              <span>Secure storage for all medical records</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-5 w-5 rounded-full bg-white mt-0.5 flex items-center justify-center text-medguard-500 text-xs font-bold">✓</div>
              <span>Instant access to healthcare professionals</span>
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
          <h1 className="text-2xl font-bold mb-1">Create Account</h1>
          <p className="text-gray-500 mb-6">Sign up to get started with Medguard</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm hover:border-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"

              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm hover:border-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"

              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
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
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm hover:border-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"

              />
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
                "Sign Up"
              )}
            </Button>

            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
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

export default Signup;
