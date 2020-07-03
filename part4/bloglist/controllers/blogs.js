const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  return response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);

  const result = await blog.save();
  return response.status(201).json(result);
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