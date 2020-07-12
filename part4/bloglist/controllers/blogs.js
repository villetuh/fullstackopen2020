const jwt = require('jsonwebtoken');
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  return response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  if (!request.token) {
    return response.status(401).json({ error: 'Unauthorized request.' });
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'Unauthorized request.' });
  }
  
  const user = await User.findById(decodedToken.id);

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
  if (!request.token) {
    return response.status(401).json({ error: 'Unauthorized request.' });
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'Unauthorized request.' });
  }
  const user = await User.findById(decodedToken.id);
  const blog = await Blog.findById(request.params.id);
  if (blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'Unauthorized request.' });
  }
  
  await blog.deleteOne();
  
  user.blogs = user.blogs.filter(blog => blog !== request.params.id);
  await user.save();
  
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