import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
// import { setDoctor } from "../Redux/features/doctorslice";
import { setdoctor } from "../Redux/features/doctorslice";
const DoctorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const { doctor } = useSelector((state) => state.doctor);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = { email, password };

    try {
      const response = await axios.post("http://localhost:3000/doctors/login", credentials);
      if (response.status === 200) {
        const { token, doctor } = response.data;
        localStorage.setItem("doctor_token", token);
        dispatch(setdoctor(doctor));

        toast({
          title: "Login successful",
          description: "Welcome back, Doctor!",
        });

        navigate("/doctor");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Invalid credentials or server error.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-medguard-50 dark:bg-background">
      <div className="hidden md:flex md:w-1/2 bg-medguard-600 text-white flex-col justify-center items-center p-10">
        <h1 className="text-3xl font-bold mb-4">Welcome Doctor!</h1>
        <p className="text-lg mb-8 text-center max-w-md">
          Access your patients' information, manage appointments, and provide better care.
        </p>
        <div className="w-full max-w-md bg-white/10 rounded-xl p-6 backdrop-blur-sm">
          <h2 className="text-xl font-medium mb-4">Why Use Medguard?</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <span className="h-5 w-5 rounded-full bg-white flex items-center justify-center text-medguard-600 font-bold">✓</span>
              <span>Manage appointments and patient records easily</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="h-5 w-5 rounded-full bg-white flex items-center justify-center text-medguard-600 font-bold">✓</span>
              <span>Secure communication with patients</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="h-5 w-5 rounded-full bg-white flex items-center justify-center text-medguard-600 font-bold">✓</span>
              <span>Real-time updates and alerts</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6">
        <div className="md:hidden flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-full bg-medguard-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">D</span>
          </div>
          <span className="text-xl font-bold text-foreground">Doctor Portal</span>
        </div>

        <div className="w-full max-w-md animate-fade-in">
          <h1 className="text-2xl font-bold mb-1 text-foreground">Doctor Login</h1>
          <p className="text-muted-foreground mb-6">Enter your credentials to access the doctor dashboard</p>

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
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <Link to="/doctor-forgot-password" className="text-xs text-medguard-600 hover:underline">
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
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-medguard-600 hover:bg-medguard-700"
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

            <p className="text-center text-sm text-muted-foreground">
              New Doctor?{" "}
              <Link to="/doctor-signup" className="text-medguard-600 hover:underline font-medium">
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DoctorLogin;
