import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SmallerTitle = styled.h3`
  font-family: 'PT Sans', sans-serif;
  font-weight: bold;
`;

const Blog = styled.div`
  padding: 10px 10px 10px 10px;
  margin-bottom: 10px;
  box-shadow: 0px 1px 3px 0px;
  border-radius: 4px;
`;

const StyledLink = styled(Link)`
  padding: 1em;
  background: 'white';
  text-decoration: none;
  color: teal;
`;

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

  return (
    <div>
      <SmallerTitle>Blogs</SmallerTitle>
      {
        blogs.sort(blogSorter)
          .map(blog =>
            <Blog key={blog.id}>
              <div className='blog-info-row'>
                <div className='blog-title'>
                  {blog.likes} likes <StyledLink to={`/blogs/${blog.id}`}>{blog.title}</StyledLink>
                </div>
              </div>
            </Blog>)
      }
    </div>
  );
};

export default Blogs;
