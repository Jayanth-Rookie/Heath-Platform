import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// import ChatInterface from "@/components/ChatInterface";
import { Button } from "@/components/ui/button";
import { ExternalLink, Heart, Sparkles } from "lucide-react";
import MentalHeathh from "../components/MentalHeathh";
import MoodBooster from "@/components/MoodBooster.jsx";


const MentalHealth = () => {
  const [showResources, setShowResources] = useState(true);
  
  useEffect(() => {
    // Add floating particles effect
    const createParticle = () => {
      const particles = document.getElementById('particles');
      if (!particles) return;
      
      const particle = document.createElement('div');
      particle.className = 'absolute w-2 h-2 rounded-full bg-white/30 animate-float';
      
      // Random position
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      
      // Random animation duration between 15-30s
      const duration = 15 + Math.random() * 15;
      
      particle.style.left = `${left}%`;
      particle.style.top = `${top}%`;
      particle.style.animationDuration = `${duration}s`;
      
      particles.appendChild(particle);
      
      // Remove particle after animation completes
      setTimeout(() => {
        particle.remove();
      }, duration * 1000);
    };
    
    // Create initial particles
    for (let i = 0; i < 15; i++) {
      createParticle();
    }
    
    // Add new particles periodically
    const interval = setInterval(createParticle, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      <div 
        className="fixed inset-0 bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100 -z-10"
        style={{
          backgroundImage: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
        }}
      />
      
      {/* Meditative figure */}
      <div className="fixed w-full h-full flex items-center justify-center opacity-10 pointer-events-none -z-5">
        <svg viewBox="0 0 100 100" width="400" height="400">
          <path d="M50,30 C45,30 42,25 42,22 C42,18 45,15 50,15 C55,15 58,18 58,22 C58,25 55,30 50,30 Z" fill="#7c3aed" />
          <path d="M50,100 C45,100 42,85 42,82 L42,40 C42,38 45,35 50,35 C55,35 58,38 58,40 L58,82 C58,85 55,100 50,100 Z" fill="#7c3aed" />
          <path d="M30,55 L42,40 L58,40 L70,55 C72,58 72,62 70,65 C68,68 64,70 60,65 L50,55 L40,65 C36,70 32,68 30,65 C28,62 28,58 30,55 Z" fill="#7c3aed" />
        </svg>
      </div>
      
      {/* Floating cherry blossoms/lotus elements */}
      <div id="particles" className="fixed inset-0 pointer-events-none z-0"></div>
      
      {/* <Navbar /> */}
      
      <main className="relative flex-grow py-8 z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-2 text-indigo-900">
                <Heart className="text-pink-500" /> Mental Wellness Space
              </h1>
              <p className="text-indigo-700">A safe place for reflection, mindfulness, and support</p>
            </div>
            
            <div className="flex gap-3">
              {/* <Button
                variant="outline"
                className="border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                onClick={() => setShowResources(!showResources)}
              >
                {showResources ? "Hide Resources" : "Show Resources"}
              </Button>
              
              <Button className="bg-rose-500 hover:bg-rose-600 text-white"> */}
                {/* Emergency Support
              </Button> */}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="h-[70vh]">
                < MentalHeathh/>
              </div>
            </div>
            <MoodBooster />
           
          </div>
        </div>
      </main>
      
      {/* Add animation keyframes to index.css instead of using the style tag */}
      
      <Footer />
    </div>
  );
};

export default MentalHealth;