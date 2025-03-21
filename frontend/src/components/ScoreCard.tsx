import React from 'react';
import { Award, Clock, Users, Star } from 'lucide-react';
import { InfluenceScore } from '../types';

interface ScoreCardProps {
  score: InfluenceScore;
}

export function ScoreCard({ score }: ScoreCardProps) {
  const metrics = [
    { icon: Award, label: 'Credibility', value: score.credibility },
    { icon: Clock, label: 'Longevity', value: score.longevity },
    { icon: Users, label: 'Engagement', value: score.engagement },
    { icon: Star, label: 'Overall Score', value: score.overall },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl">
      {metrics.map(({ icon: Icon, label, value }) => (
        <div key={label} className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center space-x-2 mb-2">
            <Icon className="text-blue-600" size={20} />
            <h3 className="font-medium text-gray-700">{label}</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      ))}
    </div>
  );
}