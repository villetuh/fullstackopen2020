import React, { useState } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background: ${props => props.primary ? 'teal' : 'white'};
  color: ${props => props.primary ? 'white' : 'teal'};
  margin: 2px;
  padding: 6px 12px;
  font-size: medium;
  border-style: solid;
  border-color: teal;
  border-radius: 4px;
  border-width: 1px;
`;

const Label = styled.label`
  display: block;
  font-size: smaller; 
  margin: 6px 0px 0px 0px;
`;

const Input = styled.input`
  margin: 6px 0px;
  padding: 8px;
`;

const AddBlog = ({ onBlogAdded }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogAuthor, setNewBlogAuthor] = useState('');
  const [newBlogUrl, setNewBlogUrl] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();

    onBlogAdded({ title: newBlogTitle, author: newBlogAuthor, url: newBlogUrl });

    setNewBlogTitle('');
    setNewBlogAuthor('');
    setNewBlogUrl('');
  };

  const handleTitleChange = (event) => {
    setNewBlogTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setNewBlogUrl(event.target.value);
  };

  return (
    <form className='add-blog-form' onSubmit={handleFormSubmit} >
      <Label>Title:</Label>
      <Input id='add-blog-title'
        value={newBlogTitle}
        onChange={handleTitleChange} />
      <Label>Author:</Label>
      <Input id='add-blog-author'
        value={newBlogAuthor}
        onChange={handleAuthorChange} />
      <Label>Url:</Label>
      <Input id='add-blog-url'
        value={newBlogUrl}
        onChange={handleUrlChange} />
      <div>
        <Button primary type="submit">Add</Button>
      </div>
    </form>
  );
};

export default AddBlog;
