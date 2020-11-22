const _ = require('lodash');

const favoriteBlog = (blogs) => {
  return blogs === undefined || blogs.length === 0
    ? undefined
    : blogs.reduce((currentFavorite, nextBlog) => currentFavorite.likes >= nextBlog.likes 
      ? currentFavorite 
      : nextBlog);
};

const mostBlogs = (blogs) => {
  if (blogs === undefined || blogs.length === 0) {
    return undefined;
  }

  let authors = _.countBy(blogs, 'author');
  const mostBlogs = Object.entries(authors).reduce((current, next) => next[1] > current[1] ? next : current, ['', -1]);

  return { author: mostBlogs[0], blogs: mostBlogs[1] };
};

const mostLikes = (blogs) => {
  if (blogs === undefined || blogs.length === 0) {
    return undefined;
  }

  let blogsByAuthor = _.groupBy(blogs, blog => blog.author);

  let authorsAndLikes = Object.entries(blogsByAuthor).map(([key, value]) => ({ author: key, likes: totalLikes(value) }));

  return authorsAndLikes.reduce((current, next) => next.likes > current.likes ? next : current, { author: '', likes: -1 });
};

const totalLikes = (blogs) => {
  return blogs === undefined || blogs.length === 0 
    ? 0 
    : blogs.reduce((sum, nextBlog) => sum + nextBlog.likes, 0);
};

module.exports = {
  favoriteBlog,
  mostBlogs,
  mostLikes,
  totalLikes
};