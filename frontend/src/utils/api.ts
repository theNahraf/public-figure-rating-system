import { TwitterProfile } from '../types';

const TWITTER_API_URL = 'https://twitter-api45.p.rapidapi.com/screenname.php';
const RAPID_API_KEY = '7ce9800032msh2a39622af6d6e23p14dbf3jsn6adbe68c03b2';
const RAPID_API_HOST = 'twitter-api45.p.rapidapi.com';

export async function fetchTwitterProfile(username: string): Promise<TwitterProfile> {
  const url = `${TWITTER_API_URL}?screenname=${username}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': RAPID_API_KEY,
      'X-RapidAPI-Host': RAPID_API_HOST,
      'Accept': 'application/json'
    }
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Failed to fetch profile: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('data is ', data);
    
    // Ensure we have a valid response
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid response format');
    }

    // Transform the API response to match our TwitterProfile type
    const profile: TwitterProfile = {
      id: data.id_str || data.id,
      name: data.name,
      username: data.profile ,
      description: data.desc,
      followers_count: data.sub_count,
      following_count: data.friends,
      created_at: data.created_at,
      verified: data.blue_verified || false,
      profile_image_url: data.avatar || null
    };

    console.log("profile by api ", profile)

    return profile;
  } catch (error) {
    console.error('Error fetching Twitter profile:', error);
    throw error;
  }
}