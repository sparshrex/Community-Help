import React from 'react';
import { Tag, SlidersHorizontal } from 'lucide-react';

const CATEGORIES = ['All', 'Tools', 'Transport', 'Emergency', 'Groceries', 'Household', 'Other'];
const SORT_OPTIONS = [
  { value: 'recent', label: 'Most Recent' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'nearest', label: 'Nearest First' }
];

function FilterBar({ selectedCategory, onCategoryChange, sortBy, onSortChange }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold flex items-center gap-2">
          <Tag className="w-5 h-5" />
          Categories
        </h3>
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-gray-500" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="border rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {SORT_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedCategory === category
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterBar;