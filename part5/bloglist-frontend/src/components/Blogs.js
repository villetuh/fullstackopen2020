import React from 'react';
import Blog from './Blog';

const Blogs = ({ blogs, addLikeHandler }) => {

  const blogSorter = (first, second) => {
    if (first.likes < second.likes) {
      return 1;
    } else if (first.likes > second.likes) {
      return -1;
    }

    return first.title.toLowerCase() <= second.title.toLowerCase() ? -1 : 1;
  };

  return (
    <div>
      {
        blogs.sort(blogSorter)
          .map(blog => <Blog key={blog.id} blog={blog} addLikeHandler={addLikeHandler} />)
      }
    </div>
  );
};

export default Blogs;
