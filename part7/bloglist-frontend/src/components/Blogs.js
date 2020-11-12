import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Blogs = () => {
  const blogs = useSelector(state => state.blogs);

  const blogSorter = (first, second) => {
    if (first.likes < second.likes) {
      return 1;
    } else if (first.likes > second.likes) {
      return -1;
    }

    return first.title.toLowerCase() <= second.title.toLowerCase() ? -1 : 1;
  };

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  return (
    <div>
      <h3>blogs</h3>
      {
        blogs.sort(blogSorter)
          .map(blog =>
            <div key={blog.id} style={blogStyle}>
              <div className='blog-info-row'>
                <div className='blog-title'>
                  {blog.likes} likes <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </div>
              </div>
            </div>)
      }
    </div>
  );
};

export default Blogs;
