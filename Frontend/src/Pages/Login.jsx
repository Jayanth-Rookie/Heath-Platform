import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import { setUser } from "../Redux/features/userslice";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  // const [user, setUser] = useState(null);
  
  const {user}=useSelector((state)=>state.user);
  const dispatch=useDispatch();

  const handleSubmit = async(e) => {


    e.preventDefault();
    const userdata={email,password};
    const response=await axios.post('http://localhost:3000/users/loginuser',userdata);
    if(response.status===200){
      const {token,user}=response.data;
        
        localStorage.setItem("token", token);
      console.log(response.data.user.username);
      // dispatch(setUser(response.data.user.username));
      dispatch(setUser(response.data.user));
    }
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      if (email && password) {
        localStorage.setItem(
          "medguard_user",
          JSON.stringify({ email, name: "John Doe", role: "patient" })
        );

        toast({
          title: "Login successful",
          description: "Welcome back to Medguard!",
        });
        navigate("/");
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Please check your credentials and try again.",
        });
      }
      setIsLoading(false);
    }, 1000);
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
        <h1 className="text-3xl font-bold mb-6">Welcome Back!</h1>
        <p className="text-lg mb-8 text-center max-w-md">
          Your personal healthcare companion. Access your medical records, book
          appointments, and get mental health support.
        </p>
        <div className="w-full max-w-md bg-white/10 rounded-xl p-6 backdrop-blur-sm">
          <h2 className="text-xl font-medium mb-4">Why Choose Medguard?</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <div className="h-5 w-5 rounded-full bg-white mt-0.5 flex items-center justify-center text-medguard-500 text-xs font-bold">
                ✓
              </div>
              <span>Secure access to all your health records</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-5 w-5 rounded-full bg-white mt-0.5 flex items-center justify-center text-medguard-500 text-xs font-bold">
                ✓
              </div>
              <span>Book appointments with qualified doctors</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-5 w-5 rounded-full bg-white mt-0.5 flex items-center justify-center text-medguard-500 text-xs font-bold">
                ✓
              </div>
              <span>24/7 mental health support whenever you need</span>
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
          <h1 className="text-2xl font-bold mb-1">Login</h1>
          <p className="text-gray-500 mb-6">
            Enter your credentials to access your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
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
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-medguard-500 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </Button>

            <p className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-medguard-500 hover:underline font-medium"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login; 