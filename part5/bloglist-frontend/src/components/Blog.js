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
  }

  return (
  <div style={blogStyle}>
    {blog.title}<button onClick={toggleDetails}>{showDetails ? 'hide' : 'view'}</button>
    { showDetails &&
      <div>
      url: {blog.url} <br />
      likes: {blog.likes} <button onClick={() => addLikeHandler(blog)}>like</button> <br />
      {blog.author} <br />
      <button style={deleteButtonStyle} onClick={() => deleteBlogHandler(blog)}>Delete</button>
    </div>
    }
  </div>
)};

export default Blog;
