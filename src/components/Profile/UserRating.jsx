import React from 'react';
import { Star } from 'lucide-react';

function UserRating({ rating, totalRatings }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        <Star className="w-4 h-4 text-yellow-400 fill-current" />
        <span className="ml-1 font-medium">{rating.toFixed(1)}</span>
      </div>
      <span className="text-sm text-gray-500">({totalRatings} ratings)</span>
    </div>
  );
}

export default UserRating;