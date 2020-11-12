import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { deleteBlog, likeBlog } from '../reducers/blogReducer';

const Blog = () => {
  const blogId = useParams().id;

  const blog = useSelector(state => state.blogs.find(blog => blog.id === blogId));
  const currentUserId = useSelector(state => state.users.userId);

  const dispatch = useDispatch();

  const handleAddLike = async (blog) => {
    dispatch(likeBlog(blog));
  };

  const handleDeleteBlog = async (blog) => {
    const result = window.confirm('Do you want to delete the blog?');
    if (result === false) {
      return;
    }

    dispatch(deleteBlog(blog));
  };

  if (!blog) {
    return null;
  }

  const deleteButtonStyle = {
    backgroundColor: 'red',
    display: currentUserId !== '' && blog.user.id === currentUserId ? '' : 'none'
  };

  return (
    <div className='blog'>
      <div className='blog-info-row'>
        <div className='blog-title'>
          <h2>{blog.title} by {blog.author}</h2>
        </div>
      </div>
      <div>
        <div className='blog-info-row'>
          <div className='blog-url'>url: <a href={blog.url}>{blog.url}</a></div>
        </div>
        <div className='blog-info-row'>
          <div className='blog-likes'>
            likes: {blog.likes}
            <button className='blog-like-button' onClick={() => handleAddLike(blog)}>like</button>
          </div>
        </div>
        <div className='blog-info-row'>
          <div className='blog-likes'>
            added by: {blog.user.name}
          </div>
        </div>
        <div className='blog-info-row'>
          <button className='blog-delete-button' style={deleteButtonStyle} onClick={() => handleDeleteBlog(blog)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
