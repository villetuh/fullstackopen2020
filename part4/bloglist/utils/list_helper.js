const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs === undefined || blogs.length === 0 
    ? 0 
    : blogs.reduce((sum, nextBlog) => sum + nextBlog.likes, 0);
};

module.exports = {
  dummy,
  totalLikes
};