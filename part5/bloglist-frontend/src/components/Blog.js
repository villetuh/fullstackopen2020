import React, { useState } from 'react';

const Blog = ({ blog, currentUser, addLikeHandler, deleteBlogHandler }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const deleteButtonStyle = {
    backgroundColor: 'red',
    display: currentUser !== '' && blog.user.id === currentUser ? '' : 'none'
  };

  return (
    <div className='blog' style={blogStyle}>
      <div className='blog-info-row'>
        <div className='blog-title'>
          {blog.title}
          <button className='blog-show-details-button' onClick={toggleDetails}>{showDetails ? 'hide' : 'view'}</button>
        </div>
      </div>
      { showDetails &&
      <div>
        <div className='blog-info-row'>
          <div className='blog-url'>url: {blog.url}</div>
        </div>
        <div className='blog-info-row'>
          <div className='blog-likes'>
            likes: {blog.likes}
            <button className='blog-like-button' onClick={() => addLikeHandler(blog)}>like</button>
          </div>
        </div>
        <div className='blog-info-row'>
          <div className='blog-author'>{blog.author}</div>
        </div>
        <div className='blog-info-row'>
          <button className='blog-delete-button' style={deleteButtonStyle} onClick={() => deleteBlogHandler(blog)}>Delete</button>
        </div>
      </div>
      }
    </div>
  );
};

export default Blog;
