import React, { useState, useMemo } from 'react';
import { HandHeart } from 'lucide-react';
import MapView from './components/Map/MapView';
import PostCard from './components/Posts/PostCard';
import CreatePostForm from './components/Posts/CreatePostForm';
import ChatWindow from './components/Chat/ChatWindow';
import VerificationForm from './components/Auth/VerificationForm';
import SearchBar from './components/Search/SearchBar';
import FilterBar from './components/Filter/FilterBar';
import RatingModal from './components/Rating/RatingModal';
import { filterPosts } from './utils/filterUtils';

function App() {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('recent');
  const [isVerified, setIsVerified] = useState(false);

  // Mock data
  const posts = [
    {
      id: '1',
      title: 'Need a drill for 2 hours',
      description: 'Working on a home project and need to borrow a power drill.',
      category: 'Tools',
      location: 'Brooklyn, NY',
      latitude: 40.6782,
      longitude: -73.9442,
      createdAt: new Date(),
      user: {
        name: 'Ramesh',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
        verified: true,
        rating: 4.5,
        totalRatings: 12
      }
    },
    {
      id: '2',
      title: 'Emergency ride to hospital',
      description: 'Need a ride to the hospital for my scheduled appointment.',
      category: 'Emergency',
      location: 'Queens, NY',
      latitude: 40.7282,
      longitude: -73.7949,
      createdAt: new Date(Date.now() - 3600000),
      user: {
        name: 'Shruti',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
        verified: true,
        rating: 4.8,
        totalRatings: 23
      }
    }
  ];

  const messages = [
    {
      id: '1',
      text: 'Hi, I saw your post about needing a drill.',
      sender: 'other',
      timestamp: new Date()
    }
  ];

  const handleVerification = (method, value) => {
    console.log('Verifying with:', method, value);
    // Here you would typically make an API call to verify the user
    setIsVerified(true);
    setShowVerification(false);
  };

  const handleRatingSubmit = (ratingData) => {
    console.log('Rating submitted:', ratingData);
    setShowRating(false);
    // Here you would typically make an API call to save the rating
  };

  // Filter and sort posts based on current filters
  const filteredPosts = useMemo(() => {
    return filterPosts(posts, {
      searchQuery,
      category: selectedCategory,
      sortBy
    });
  }, [posts, searchQuery, selectedCategory, sortBy]);

  const handleCreatePost = () => {
    if (!isVerified) {
      setShowVerification(true);
    } else {
      setShowCreatePost(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <HandHeart className="w-8 h-8 text-blue-500" />
              <h1 className="text-2xl font-bold text-gray-900">Community Help</h1>
            </div>
            <button
              onClick={handleCreatePost}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Create Request
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 space-y-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
          />
          <FilterBar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Posts */}
          <div className="space-y-6">
            {filteredPosts.length === 0 ? (
              <div className="bg-white p-6 rounded-lg text-center text-gray-500">
                No help requests found matching your criteria.
              </div>
            ) : (
              filteredPosts.map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  onChat={() => {
                    if (!isVerified) {
                      setShowVerification(true);
                    } else {
                      setShowChat(true);
                      setSelectedPost(post);
                    }
                  }}
                />
              ))
            )}
          </div>

          {/* Main Content - Map */}
          <div className="lg:col-span-2 h-[600px] rounded-lg overflow-hidden z-20">
            <MapView
              posts={filteredPosts}
              onMarkerClick={setSelectedPost}
            />
          </div>
        </div>
      </main>

      {/* Modals */}
      {showCreatePost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <CreatePostForm
              onSubmit={(data) => {
                console.log('New post:', data);
                setShowCreatePost(false);
                // Show rating modal after help is received
                setShowRating(true);
              }}
            />
          </div>
        </div>
      )}

      {showChat && selectedPost && (
        <div className="fixed bottom-0 right-0 w-96 h-[500px] bg-white shadow-lg rounded-t-lg z-50">
          <ChatWindow

            recipientName={selectedPost.user.name}
            messages={messages}
            onSendMessage={()=>showRating(true)}
            onClose={() => {
              setShowChat(false);
              setSelectedPost(null);
            }}
          />
        </div>
      )}

      {showVerification && (
        <div className="fixed  inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <VerificationForm onVerify={handleVerification} />
        </div>
      )}

      {showRating && (
        <div className='fixed inset-0 z-50'>
        <RatingModal
          onSubmit={handleRatingSubmit}
          onClose={() => setShowRating(false)}
          userName={selectedPost?.user.name || 'the helper'}
        />
        </div>
      )}
    </div>
  );
}

export default App;