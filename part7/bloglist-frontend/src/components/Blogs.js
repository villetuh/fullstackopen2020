import React from 'react';
import { useSelector } from 'react-redux';

import Blog from './Blog';

const Blogs = ({ addLikeHandler, deleteBlogHandler }) => {
  const blogs = useSelector(state => state.blogs);
  const currentUserId = useSelector(state => state.currentUser.userId);

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
          .map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              currentUser={currentUserId}
              addLikeHandler={addLikeHandler}
              deleteBlogHandler={deleteBlogHandler}
            />)
      }
    </div>
  );
};

export default Blogs;
