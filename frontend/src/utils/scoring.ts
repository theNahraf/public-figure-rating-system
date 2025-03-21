import { differenceInYears } from 'date-fns';
import { TwitterProfile, InfluenceScore } from '../types';

export function calculateInfluenceScore(profile: TwitterProfile): InfluenceScore {
  // Calculate longevity score (0-100)
  const accountAge = differenceInYears(new Date(), new Date(profile.created_at));
  const longevity = Math.min(100, (accountAge / 15) * 100);

  // Calculate engagement score (0-100)
  const engagementRate = (profile.followers_count / (profile.following_count || 1)) * 100;
  const engagement = Math.min(100, engagementRate);

  // Calculate credibility score (0-100)
  const credibility = profile.verified ? 100 : Math.min(90, (profile.followers_count / 10000));

  // Calculate overall score (weighted average)
  const overall = Math.round(
    (credibility * 0.4) + (longevity * 0.3) + (engagement * 0.3)
  );

  return {
    credibility: Math.round(credibility),
    longevity: Math.round(longevity),
    engagement: Math.round(engagement),
    overall
  };
}