import React, { useState, useMemo } from 'react';
import { ads } from './data/ads';
import { Ad, AdsByGenre } from './types';
import AdList from './components/AdList';
import LoginPrompt from './components/LoginPrompt';
import { Twitter } from 'lucide-react';

function App() {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [visibleAdsCount, setVisibleAdsCount] = useState(4);

  const adsByGenre: AdsByGenre = useMemo(() => {
    return ads.reduce((acc: AdsByGenre, ad: Ad) => {
      if (!acc[ad.genre]) {
        acc[ad.genre] = [];
      }
      acc[ad.genre].push(ad);
      return acc;
    }, {});
  }, []);

  const genres = Object.keys(adsByGenre);

  const filteredAds = selectedGenre ? adsByGenre[selectedGenre] : ads;
  const visibleAds = filteredAds.slice(0, visibleAdsCount);

  const handleGenreSelect = (genre: string | null) => {
    if (!isLoggedIn && genre !== null) {
      setShowLoginPrompt(true);
    } else {
      setSelectedGenre(genre);
      setVisibleAdsCount(10);
    }
  };

  const handleLoadMore = () => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
    } else {
      setVisibleAdsCount((prev) => prev + 10);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLoginPrompt(false);
    if (selectedGenre === null) {
      setVisibleAdsCount(4);
    } else {
      setVisibleAdsCount(10);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            <Twitter className="w-8 h-8 mr-2" />
            <h1 className="text-2xl font-bold">Twitter広告一覧</h1>
          </div>
          {!isLoggedIn && (
            <button
              className="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold"
              onClick={() => setShowLoginPrompt(true)}
            >
              ログイン
            </button>
          )}
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">ジャンルで絞り込み：</h2>
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-3 py-1 rounded-full ${
                selectedGenre === null
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
              onClick={() => handleGenreSelect(null)}
            >
              すべて
            </button>
            {genres.map((genre) => (
              <button
                key={genre}
                className={`px-3 py-1 rounded-full ${
                  selectedGenre === genre
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
                onClick={() => handleGenreSelect(genre)}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
        <AdList ads={visibleAds} />
        {visibleAds.length < filteredAds.length && (
          <div className="mt-6 text-center">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold"
              onClick={handleLoadMore}
            >
              もっと見る
            </button>
          </div>
        )}
      </main>
      {showLoginPrompt && <LoginPrompt onLogin={handleLogin} onClose={() => setShowLoginPrompt(false)} />}
    </div>
  );
}

export default App;