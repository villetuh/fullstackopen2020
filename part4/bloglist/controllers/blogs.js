const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  return response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const users = await User.find({});
  const user = users[0];

  const blog = new Blog({
    ...request.body,
    user: user._id
  });

  const savedBlog = await blog.save();
  
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  
  return response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  return response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = { 
    title: request.body.title,
    author: request.body.author,
    likes: request.body.likes,
    url: request.body.url
  };
  await Blog.findOneAndUpdate(request.params.id, updatedBlog, { new: true });
  return response.json(updatedBlog);
});

module.exports = blogsRouter;