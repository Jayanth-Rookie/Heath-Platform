
// A simple sentiment analysis service

export type Mood = 'verylow' | 'low' | 'neutral' | 'positive';

export interface SentimentResult {
  score: number;
  comparative: number;
  mood: Mood;
}

// Simple word-based sentiment analysis
// In a production app, you might want to use a more sophisticated library or API
export function analyzeSentiment(text: string): SentimentResult {
  // Simplified sentiment dictionary
  const positiveWords = [
    'happy', 'glad', 'joy', 'excited', 'wonderful', 'amazing', 'love', 'delighted', 
    'good', 'great', 'excellent', 'fantastic', 'terrific', 'awesome', 'fabulous',
    'smile', 'blessed', 'grateful', 'thankful', 'hopeful', 'optimistic'
  ];
  
  const negativeWords = [
    'sad', 'bad', 'upset', 'depressed', 'unhappy', 'miserable', 'terrible', 
    'horrible', 'awful', 'disappointed', 'frustrated', 'angry', 'mad', 'hate',
    'annoyed', 'irritated', 'heartbroken', 'gloomy', 'melancholy', 'lonely',
    'tired', 'exhausted', 'stressed', 'worried', 'anxious', 'fearful', 'scared',
    'hopeless', 'lost', 'numb', 'empty', 'worthless', 'failure'
  ];
  
  // Normalize text: convert to lowercase and remove punctuation
  const normalizedText = text.toLowerCase().replace(/[^\w\s]/gi, '');
  const words = normalizedText.split(/\s+/);
  
  // Count positive and negative words
  let positiveCount = 0;
  let negativeCount = 0;
  
  words.forEach(word => {
    if (positiveWords.includes(word)) positiveCount++;
    if (negativeWords.includes(word)) negativeCount++;
  });
  
  // Calculate sentiment score
  const score = positiveCount - negativeCount;
  const comparative = words.length > 0 ? score / words.length : 0;
  
  // Determine mood
  let mood: Mood;
  if (score < -2) {
    mood = 'verylow';
  } else if (score < 0) {
    mood = 'low';
  } else if (score === 0) {
    mood = 'neutral';
  } else {
    mood = 'positive';
  }
  
  return { score, comparative, mood };
}
