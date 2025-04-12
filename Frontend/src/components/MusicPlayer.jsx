import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Music, Youtube, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const MusicPlayer = ({ song, onNewSong }) => {
  // Extract YouTube video ID from the YouTube link
  const getYoutubeVideoId = (url) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
    return match ? match[1] : '';
  };

  const youtubeVideoId = getYoutubeVideoId(song.youtubeLink);
  const embedUrl = `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1`;

  return (
    <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-lg animate-float">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music className="h-5 w-5 text-purple-500" />
          {song.title}
        </CardTitle>
        <CardDescription>{song.artist}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{song.description}</p>
        
        <div className="rounded-lg overflow-hidden mb-4 aspect-video">
          <iframe
            width="100%"
            height="100%"
            src={embedUrl}
            title={`${song.title} by ${song.artist}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="aspect-video"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2 justify-between">
        <Button 
          variant="outline" 
          className="w-full sm:w-auto group"
          onClick={() => window.open(song.youtubeLink, '_blank')}
        >
          <Youtube className="h-4 w-4 mr-2 text-red-500 group-hover:scale-110 transition-transform" />
          Watch on YouTube
        </Button>
        <Button 
          variant="outline"
          className="w-full sm:w-auto group"
          onClick={() => window.open(song.spotifyLink, '_blank')}
        >
          <div className="h-4 w-4 mr-2 text-green-500 group-hover:scale-110 transition-transform">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
          </div>
          Listen on Spotify
        </Button>
        <Button onClick={onNewSong} className="w-full sm:w-auto">
          <ExternalLink className="h-4 w-4 mr-2" />
          New Song
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MusicPlayer;