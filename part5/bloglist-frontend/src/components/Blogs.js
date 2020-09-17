import React from 'react';
import Blog from './Blog';

const Blogs = ({ blogs, addLikeHandler }) => {
  return (
    <div>
      {
        blogs.map(blog => <Blog key={blog.id} blog={blog} addLikeHandler={addLikeHandler} />)
      }
    </div>
  );
};

export default Blogs;
