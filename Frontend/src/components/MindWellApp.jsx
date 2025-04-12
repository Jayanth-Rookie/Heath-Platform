import React, { useState } from 'react';
import MentalHeathh from './MentalHeathh';
import MoodBooster from './MoodBooster';

const MindWellApp = () => {
  const [keywords, setKeywords] = useState('');

  return (
    <div className="flex flex-col items-center p-4 gap-6">
      <h1 className="text-3xl font-bold text-center mb-4">MindWell + Melody Mood Booster</h1>
      
      {/* MentalHeathh Component */}
      <MentalHeathh onSentimentAnalyzed={setKeywords} />

      {/* MoodBooster Component */}
      <MoodBooster keywords={keywords} />
    </div>
  );
};

export default MindWellApp;