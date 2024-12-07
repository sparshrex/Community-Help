import React from 'react';
import { Clock, MapPin, MessageCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

function PostCard({ post, onChat }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        <img
          src={post.user.avatar}
          alt={post.user.name}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h3 className="font-semibold flex items-center gap-1">
            {post.user.name}
            {post.user.verified && (
              <span className="text-blue-500">✓</span>
            )}
          </h3>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {formatDistanceToNow(post.createdAt)} ago
          </p>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-2">{post.title}</h2>
      <p className="text-gray-600 mb-3">{post.description}</p>

      <div className="flex items-center gap-2 mb-3">
        <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
          {post.category}
        </span>
        <span className="text-gray-500 text-sm flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {post.location}
        </span>
      </div>

      <button
        onClick={() => onChat(post.id)}
        className="w-full bg-blue-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
      >
        <MessageCircle className="w-5 h-5" />
        Chat with Helper
      </button>
    </div>
  );
}

export default PostCard;