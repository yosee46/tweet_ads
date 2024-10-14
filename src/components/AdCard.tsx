import React from 'react';
import { Ad } from '../types';

interface AdCardProps {
  ad: Ad;
}

const AdCard: React.FC<AdCardProps> = ({ ad }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={ad.image} alt={ad.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{ad.title}</h3>
        <p className="text-gray-600 mb-2">{ad.details}</p>
        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
          {ad.genre}
        </span>
      </div>
    </div>
  );
};

export default AdCard;