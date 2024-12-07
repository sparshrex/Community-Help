export function filterPosts(posts, { searchQuery, category, sortBy }) {
  let filteredPosts = [...posts];

  // Apply search filter
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredPosts = filteredPosts.filter(post =>
      post.title.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query) ||
      post.location.toLowerCase().includes(query)
    );
  }

  // Apply category filter
  if (category && category !== 'All') {
    filteredPosts = filteredPosts.filter(post => post.category === category);
  }

  // Apply sorting
  switch (sortBy) {
    case 'oldest':
      filteredPosts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      break;
    case 'nearest':
      // Note: This would require user's location to be implemented properly
      // For now, we'll just keep the current order
      break;
    case 'recent':
    default:
      filteredPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
  }

  return filteredPosts;
}