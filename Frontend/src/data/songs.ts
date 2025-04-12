
export interface Song {
  title: string;
  artist: string;
  youtubeLink: string;
  spotifyLink: string;
  description: string;
  previewUrl: string; // Added preview URL for direct playing
}

export interface SongDatabase {
  'verylow': Song[];
  'low': Song[];
  'neutral': Song[];
  'positive': Song[];
}

export const songs: SongDatabase = {
  'verylow': [
    {
      title: "Lovely Day",
      artist: "Bill Withers",
      youtubeLink: "https://www.youtube.com/watch?v=bEeaS6fuUoA",
      spotifyLink: "https://open.spotify.com/track/0bRXwKfigvpKZUurwqAlEh",
      description: "A classic uplifting song to remind you that better days are ahead.",
      previewUrl: "https://p.scdn.co/mp3-preview/6aba268f9815e85139b92af5acde6ef53015f7f9?cid=0beee08e00b947e0aaa2d5cc7f8ffd30"
    },
    {
      title: "Here Comes The Sun",
      artist: "The Beatles",
      youtubeLink: "https://www.youtube.com/watch?v=KQetemT1sWc",
      spotifyLink: "https://open.spotify.com/track/6dGnYIeXmHdcikdzNNDMm2",
      description: "A gentle reminder that after every night comes the sun.",
      previewUrl: "https://p.scdn.co/mp3-preview/6902e7da51d2f17e5369d57dadf8ce7d2a123f99?cid=0beee08e00b947e0aaa2d5cc7f8ffd30"
    },
    {
      title: "Three Little Birds",
      artist: "Bob Marley",
      youtubeLink: "https://www.youtube.com/watch?v=HNBCVM4KbUM",
      spotifyLink: "https://open.spotify.com/track/6A9mKXlFRPMPPGhKcFMh9z",
      description: "Don't worry about a thing, every little thing is gonna be alright.",
      previewUrl: "https://p.scdn.co/mp3-preview/bfc5ada9ac18c404582c8fdd21b60d15939c88b9?cid=0beee08e00b947e0aaa2d5cc7f8ffd30"
    }
  ],
  'low': [
    {
      title: "Unstoppable",
      artist: "Sia",
      youtubeLink: "https://www.youtube.com/watch?v=cxjvTXo9WWM",
      spotifyLink: "https://open.spotify.com/track/1yvMUkIOTeUNtNWlVAFQFg",
      description: "An empowering anthem to help you feel unstoppable.",
      previewUrl: "https://p.scdn.co/mp3-preview/dd5a47af68e119efe0b1b149a13b95f1c865f31e?cid=0beee08e00b947e0aaa2d5cc7f8ffd30"
    },
    {
      title: "Fight Song",
      artist: "Rachel Platten",
      youtubeLink: "https://www.youtube.com/watch?v=xo1VInw-SKc",
      spotifyLink: "https://open.spotify.com/track/0sYRkGkXfCGyCVRzvZRXKC",
      description: "This is your fight song - take back your life!",
      previewUrl: "https://p.scdn.co/mp3-preview/f4d7d093b3bd0a4e9cc8d97bef541d330986bf5b?cid=0beee08e00b947e0aaa2d5cc7f8ffd30"
    },
    {
      title: "Happy",
      artist: "Pharrell Williams",
      youtubeLink: "https://www.youtube.com/watch?v=ZbZSe6N_BXs",
      spotifyLink: "https://open.spotify.com/track/60nZcImufyMA1MKQZ2Bk3P",
      description: "A burst of happiness in musical form to lift your spirits.",
      previewUrl: "https://p.scdn.co/mp3-preview/7a1ea84e4c48af7f90c7c04e4b468ef1c4fa557a?cid=0beee08e00b947e0aaa2d5cc7f8ffd30"
    }
  ],
  'neutral': [
    {
      title: "Good Vibrations",
      artist: "The Beach Boys",
      youtubeLink: "https://www.youtube.com/watch?v=Eab_beh07HU",
      spotifyLink: "https://open.spotify.com/track/7tf64G1xVv0PuZ7Tvg8aRm",
      description: "Feel the good vibrations and positive energy.",
      previewUrl: "https://p.scdn.co/mp3-preview/63fca9ca74cd321f06475ef50ca9d36d67b7c345?cid=0beee08e00b947e0aaa2d5cc7f8ffd30"
    },
    {
      title: "Walking on Sunshine",
      artist: "Katrina & The Waves",
      youtubeLink: "https://www.youtube.com/watch?v=iPUmE-tne5U",
      spotifyLink: "https://open.spotify.com/track/05wIrZSwuaVWhcv5FfqeH0",
      description: "A burst of sunshine to brighten your day.",
      previewUrl: "https://p.scdn.co/mp3-preview/63fca9ca74cd321f06475ef50ca9d36d67b7c345?cid=0beee08e00b947e0aaa2d5cc7f8ffd30"
    },
    {
      title: "What a Wonderful World",
      artist: "Louis Armstrong",
      youtubeLink: "https://www.youtube.com/watch?v=VqhCQZaH4Vs",
      spotifyLink: "https://open.spotify.com/track/29U7stRjqHU6rMiS8BfaI9",
      description: "A reminder of the beauty all around us.",
      previewUrl: "https://p.scdn.co/mp3-preview/5895bfa5893f6feb5d21662d5bc1ed4545d61e42?cid=0beee08e00b947e0aaa2d5cc7f8ffd30"
    }
  ],
  'positive': [
    {
      title: "Can't Stop the Feeling",
      artist: "Justin Timberlake",
      youtubeLink: "https://www.youtube.com/watch?v=ru0K8uYEZWw",
      spotifyLink: "https://open.spotify.com/track/1WkMMavIMc4JZ8cfMmxHkI",
      description: "Keep that good mood going with this upbeat hit!",
      previewUrl: "https://p.scdn.co/mp3-preview/e2d47899abccb9a48cc79a37f513c5be53784c4d?cid=0beee08e00b947e0aaa2d5cc7f8ffd30"
    },
    {
      title: "Uptown Funk",
      artist: "Mark Ronson ft. Bruno Mars",
      youtubeLink: "https://www.youtube.com/watch?v=OPf0YbXqDm0",
      spotifyLink: "https://open.spotify.com/track/32OlwWuMpZ6b0aN2RZOeMS",
      description: "Funky, upbeat and guaranteed to keep that smile on your face.",
      previewUrl: "https://p.scdn.co/mp3-preview/d5e1523b71e0e56e9fd446ce7693bb7e8588fce0?cid=0beee08e00b947e0aaa2d5cc7f8ffd30"
    },
    {
      title: "Shake It Off",
      artist: "Taylor Swift",
      youtubeLink: "https://www.youtube.com/watch?v=nfWlot6h_JM",
      spotifyLink: "https://open.spotify.com/track/0cqRj7pUJDkTCEsJkx8snD",
      description: "The players gonna play and the haters gonna hate, but you're just gonna shake it off!",
      previewUrl: "https://p.scdn.co/mp3-preview/e6e5856e7b4797aaeb7edcf7e9c42d7f87e304ed?cid=0beee08e00b947e0aaa2d5cc7f8ffd30"
    }
  ]
};

export function getRandomSongForMood(mood: keyof SongDatabase): Song | null {
  if (!mood || !songs[mood]) {
    console.warn(`Invalid mood: '${mood}' passed to getRandomSongForMood`);
    return null;
  }
  const moodSongs = songs[mood];
  const randomIndex = Math.floor(Math.random() * moodSongs.length);
  return moodSongs[randomIndex];
}

