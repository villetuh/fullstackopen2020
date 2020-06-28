const favoriteBlog = (blogs) => {
  return blogs === undefined || blogs.length === 0
    ? undefined
    : blogs.reduce((currentFavorite, nextBlog) => currentFavorite.likes >= nextBlog.likes 
      ? currentFavorite 
      : nextBlog);
};

const totalLikes = (blogs) => {
  return blogs === undefined || blogs.length === 0 
    ? 0 
    : blogs.reduce((sum, nextBlog) => sum + nextBlog.likes, 0);
};

module.exports = {
  favoriteBlog,
  totalLikes
};