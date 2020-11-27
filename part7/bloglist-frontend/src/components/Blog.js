import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { deleteBlog, likeBlog } from '../reducers/blogReducer';

import Comments from './Comments';

const SmallerTitle = styled.h3`
  font-family: 'PT Sans', sans-serif;
  font-weight: bold;
`;

const LikeButton = styled.button`
  background: ${props => props.primary ? 'teal' : 'white'};
  color: ${props => props.primary ? 'white' : 'teal'};
  margin: 2px;
  padding: 3px 6px;
  font-size: small;
  border-style: solid;
  border-color: teal;
  border-radius: 4px;
  border-width: 1px;
`;

const DeleteButton = styled.button`
  background: white;
  color: red;
  margin: 2px;
  padding: 3px 6px;
  font-size: small;
  border-style: solid;
  border-color: red;
  border-radius: 4px;
  border-width: 1px;
`;

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
    display: currentUserId !== '' && blog.user.id === currentUserId ? '' : 'none'
  };

  return (
    <div className='blog'>
      <div className='blog-info-row'>
        <div className='blog-title'>
          <SmallerTitle>{blog.title} by {blog.author}</SmallerTitle>
        </div>
      </div>
      <div>
        <div className='blog-info-row'>
          <div className='blog-url'>URL: <a href={blog.url}>{blog.url}</a></div>
        </div>
        <div className='blog-info-row'>
          <div className='blog-likes'>
            Likes: {blog.likes}
          </div>
        </div>
        <div className='blog-info-row'>
          <div className='blog-likes'>
            Added by: {blog.user.name}
          </div>
        </div>
        <div className='blog-info-row'>
          <LikeButton primary className='blog-like-button' onClick={() => handleAddLike(blog)}>Like</LikeButton>
          <DeleteButton className='blog-delete-button' style={deleteButtonStyle} onClick={() => handleDeleteBlog(blog)}>Delete</DeleteButton>
        </div>
      </div>
      <Comments blog={blog} comments={blog.comments} />
    </div>
  );
};

export default Blog;
