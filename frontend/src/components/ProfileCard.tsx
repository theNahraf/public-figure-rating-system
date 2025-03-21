
import { TwitterProfile } from '../types';
import { Calendar, Users } from 'lucide-react';
import { format } from 'date-fns';
// import { Link } from 'react-router-dom';

interface ProfileCardProps {
  profile: TwitterProfile;
}

export function ProfileCard({ profile }: ProfileCardProps) {
  // Ensure followers_count has a default value if undefined
  const followersCount = profile.followers_count || 0;
  console.log("profile", profile)

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
      <div className="flex items-center space-x-4">
        <img
          src={profile.profile_image_url}
          alt={profile.name}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {profile.name}
            {profile.verified && (
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                Verified
              </span>
            )}
          </h2>
          <p className="text-gray-600">@{profile.username}</p>
        </div>
      </div>

      <p className="mt-4 text-gray-700">{profile.description}</p>
      <p className="mt-4 text-blue-200">{profile.website}</p>
     
      {/* <Link to={profile.website==="not found" ? profile.website : '/'} className="mt-4 text-blue-300">{profile.website}</Link> */}


      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Calendar size={18} className="text-gray-500" />
          <span className="text-sm text-gray-600">
            Joined {format(new Date(profile.created_at), 'MMMM yyyy')}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Users size={18} className="text-gray-500" />
          <span className="text-sm text-gray-600">
            {followersCount.toLocaleString()} followers
          </span>
        </div>
      </div>
    </div>
  );
}