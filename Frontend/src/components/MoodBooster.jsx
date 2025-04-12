// import React, { useState } from 'react';
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { useToast } from "@/components/ui/use-toast";
// import { Send, RefreshCw } from 'lucide-react';
// import { analyzeSentiment } from '@/services/sentimentService';
// import { getRandomSongForMood } from '@/data/songs';
// import MusicPlayer from './MusicPlayer';
// import { cn } from '@/lib/utils';

// const MoodBooster = () => {
//   const [input, setInput] = useState('');
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [mood, setMood] = useState(null);
//   const [song, setSong] = useState(null);
//   const { toast } = useToast();

//   const getMoodGradient = (currentMood) => {
//     switch (currentMood) {
//       case 'very-low':
//         return 'from-mood-very-low to-mood-low';
//       case 'low':
//         return 'from-mood-low to-mood-neutral';
//       case 'neutral':
//         return 'from-mood-neutral to-mood-positive';
//       case 'positive':
//         return 'from-mood-positive to-mood-neutral';
//       default:
//         return 'from-blue-50 to-indigo-100';
//     }
//   };

//   const handleGetSong = () => {
//     if (!mood) return;
//     setSong(getRandomSongForMood(mood));
//   };

//   const handleAnalyze = () => {
//     if (!input.trim()) {
//       toast({
//         title: "Empty input",
//         description: "Please share how you're feeling",
//         variant: "destructive"
//       });
//       return;
//     }
    
//     setIsAnalyzing(true);
    
//     // Simulate a processing delay
//     setTimeout(() => {
//       const result = analyzeSentiment(input);
//       setMood(result.mood);
//       setIsAnalyzing(false);

//       // Get a song recommendation
//       const recommendedSong = getRandomSongForMood(result.mood);
//       setSong(recommendedSong);
      
//       toast({
//         title: "Analysis complete",
//         description: getMoodMessage(result.mood),
//       });
//     }, 1500);
//   };

//   const getMoodMessage = (currentMood) => {
//     switch (currentMood) {
//       case 'very-low':
//         return "You seem to be having a tough time. Here's a song to lift your spirits!";
//       case 'low':
//         return "Your mood could use a little boost. This song might help!";
//       case 'neutral':
//         return "You seem to be doing okay. Let's add some positive vibes with this song!";
//       case 'positive':
//         return "You're already in a good mood! Let's keep those positive vibes going!";
//       default:
//         return "Let's enjoy some music together!";
//     }
//   };

//   return (
//     <div className={cn(
//       "min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-8 transition-all duration-1000",
//       "bg-gradient-to-br bg-200% animate-gradient-shift",
//       getMoodGradient(mood)
//     )}>
//       <div className="max-w-lg w-full flex flex-col gap-6">
//         {/* <div className="text-center mb-2">
//           <h1 className="text-3xl sm:text-4xl font-bold text-purple-700 mb-2">Melody Mood Booster</h1>
//           <p className="text-gray-700">Share how you're feeling, and I'll recommend an uplifting song!</p>
//         </div> */}
        
//         <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
//           <CardHeader>
//             <CardTitle>How are you feeling?</CardTitle>
//             <CardDescription>Express your current mood or emotions</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Textarea
//               placeholder="I'm feeling a bit down today because..."
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               className="min-h-[100px] resize-none"
//             />
//           </CardContent>
//           <CardFooter className="flex justify-between gap-2">
//             <Button
//               variant="outline"
//               onClick={() => setInput('')}
//               disabled={!input || isAnalyzing}
//             >
//               Clear
//             </Button>
//             <Button 
//               className="gap-2" 
//               onClick={handleAnalyze} 
//               disabled={!input || isAnalyzing}
//             >
//               {isAnalyzing ? (
//                 <RefreshCw className="h-4 w-4 animate-spin" />
//               ) : (
//                 <Send className="h-4 w-4" />
//               )}
//               {isAnalyzing ? "Analyzing..." : "Analyze Mood"}
//             </Button>
//           </CardFooter>
//         </Card>
        
//         {song && (
//           <MusicPlayer 
//             song={song} 
//             onNewSong={handleGetSong}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default MoodBooster;

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import MusicPlayer from './MusicPlayer';
import { analyzeSentiment } from '@/services/sentimentService';
import { getRandomSongForMood } from '@/data/songs';
import { useSelector } from 'react-redux';

const MoodBooster = () => {
  const { mood } = useSelector((state) => state.mood); // e.g., 'very-low', 'low', 'neutral', 'positive'
  const [song, setSong] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    if (mood) {
      handleAnalyze(mood);
    }
  }, [mood]); // 🔁 Trigger on mood change

  const handleAnalyze = (currentMood) => {
    console.log('Analyzing mood...', currentMood);
    const recommendedSong = getRandomSongForMood(currentMood);

    if (!recommendedSong) {
      toast({
        title: "Mood not recognized",
        description: "We couldn't find songs for this mood.",
        variant: "destructive"
      });
      return;
    }

    setSong(recommendedSong);
    console.log('Analyzing completed...');

    toast({
      title: "Analysis complete",
      description: getMoodMessage(currentMood),
    });
  };

  const getMoodMessage = (currentMood) => {
    switch (currentMood) {
      case 'very-low':
        return "You seem to be having a tough time. Here's a song to lift your spirits!";
      case 'low':
        return "Your mood could use a little boost. This song might help!";
      case 'neutral':
        return "You seem to be doing okay. Let's add some positive vibes with this song!";
      case 'positive':
        return "You're already in a good mood! Let's keep those positive vibes going!";
      default:
        return "Let's enjoy some music together!";
    }
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle>Recommended Song</CardTitle>
        <CardDescription>Based on your mood</CardDescription>
      </CardHeader>
      <CardContent>
        {song ? (
          <MusicPlayer song={song} />
        ) : (
          <p className="text-center text-gray-500">Analyzing your mood...</p>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodBooster;
