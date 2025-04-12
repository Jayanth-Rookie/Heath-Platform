import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from '@/lib/utils';

const AudioPlayer = ({ song, onNextSong, onPrevSong }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [error, setError] = useState(false);
  const audioRef = useRef(null);

  // Initialize volume when component mounts
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => {
          console.error("Error playing audio:", err);
          setError(true);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setError(false);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    onNextSong && onNextSong();
  };

  const handleError = () => {
    setError(true);
    setIsPlaying(false);
  };

  const handleVolumeChange = (value) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const handleSeek = (value) => {
    const seekTime = value[0];
    setCurrentTime(seekTime);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Use preview URL from song object for the audio source
  const audioSrc = song?.previewUrl || '';

  // Handle prev/next button actions
  const handlePrev = () => {
    if (onPrevSong) {
      onPrevSong();
    } else if (onNextSong) {
      // Fallback to onNextSong if onPrevSong is not provided
      onNextSong();
    }
  };

  return (
    <div className="w-full bg-white/10 backdrop-blur-lg rounded-lg p-4 shadow-md">
      <div className="mb-2 flex justify-between items-center">
        <div>
          <p className="text-sm font-medium">{song?.title || 'Unknown Title'}</p>
          <p className="text-xs text-gray-500">{song?.artist || 'Unknown Artist'}</p>
        </div>
        <div className="flex items-center space-x-1">
          <Volume2 className="h-4 w-4 text-gray-500" />
          <Slider
            value={[volume]}
            min={0}
            max={100}
            step={1}
            onValueChange={handleVolumeChange}
            className="w-20"
          />
        </div>
      </div>

      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onError={handleError}
      />

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs">{formatTime(currentTime)}</span>
          <span className="text-xs">{formatTime(duration)}</span>
        </div>
        <Slider
          value={[currentTime]}
          min={0}
          max={duration || 100}
          step={0.1}
          onValueChange={handleSeek}
          className="w-full"
          disabled={!audioSrc || error}
        />
      </div>

      <div className="flex items-center justify-center mt-3 gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="rounded-full h-10 w-10 p-0"
          onClick={handlePrev}
          disabled={!audioSrc || error}
        >
          <SkipBack className="h-5 w-5" />
        </Button>
        <Button 
          variant="default" 
          size="sm" 
          className={cn("rounded-full h-12 w-12 p-0", (!audioSrc || error) && "opacity-50 cursor-not-allowed")}
          onClick={togglePlay}
          disabled={!audioSrc || error}
        >
          {isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6 ml-1" />
          )}
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="rounded-full h-10 w-10 p-0"
          onClick={onNextSong}
          disabled={!audioSrc || error}
        >
          <SkipForward className="h-5 w-5" />
        </Button>
      </div>
      
      {(!audioSrc || error) && (
        <div className="text-center mt-3 text-sm text-yellow-600">
          <p>{error ? "Error playing audio. Try another song." : "Preview not available. Try another song."}</p>
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;