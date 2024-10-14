import React from 'react';
import { Ad } from '../types';
import AdCard from './AdCard';

interface AdListProps {
  ads: Ad[];
}

const AdList: React.FC<AdListProps> = ({ ads }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {ads.map((ad) => (
        <AdCard key={ad.id} ad={ad} />
      ))}
    </div>
  );
};

export default AdList;