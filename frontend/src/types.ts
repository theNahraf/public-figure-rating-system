export interface TwitterProfile {
  id: string;
  name: string;
  username: string;
  description: string;
  followers_count: number;
  following_count: number;
  created_at: string;
  verified: boolean;
  profile_image_url: string;
  website : string;
}

export interface InfluenceScore {
  credibility: number;
  longevity: number;
  engagement: number;
  overall: number;
}
