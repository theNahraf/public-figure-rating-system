import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { SearchBar } from './components/SearchBar';
import { ProfileCard } from './components/ProfileCard';
import { ScoreCard } from './components/ScoreCard';
import { fetchTwitterProfile } from './utils/api';
import { calculateInfluenceScore } from './utils/scoring';
import { TwitterProfile, InfluenceScore } from './types';
import { TrendingUp } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from "@clerk/clerk-react";
 
function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<TwitterProfile | null>(null);
  const [score, setScore] = useState<InfluenceScore | null>(null);

  const handleSearch = async (username: string) => {
    setIsLoading(true);
    try {
      const profileData = await fetchTwitterProfile(username);
      setProfile(profileData);
      const influenceScore = calculateInfluenceScore(profileData);
      setScore(influenceScore);
    } catch (error) {
      toast.error('Failed to fetch profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <SignedOut>
        <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Welcome to InfluenceIQ</h2>
          <SignInButton className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all" />
        </div>
      </SignedOut>

      <SignedIn>
        <div className="w-full">
          <div className="flex justify-between p-4 bg-white shadow-md">
            <UserButton afterSignOutUrl="/" />
            <SignOutButton className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all" />
          </div>

          <div className="min-h-screen bg-gray-50">
            <Toaster position="top-center" />
            
            <div className="max-w-7xl mx-auto px-4 py-12">
              <div className="text-center mb-12">
                <div className="flex items-center justify-center mb-4">
                  <TrendingUp className="text-blue-600 w-12 h-12" />
                  <h1 className="text-4xl font-bold text-gray-900 ml-3">InfluenceIQ</h1>
                </div>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Discover the true influence of public figures with our powered analysis
                </p>
              </div>

              <div className="flex flex-col items-center space-y-8">
                <SearchBar onSearch={handleSearch} isLoading={isLoading} />

                {profile && score && (
                  <div className="space-y-8 w-full flex flex-col items-center">
                    <ProfileCard profile={profile} />
                    <ScoreCard score={score} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </SignedIn>
    </div>
  );
}

export default App;