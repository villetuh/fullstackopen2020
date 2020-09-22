import React, { useState } from 'react';

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
    <form onSubmit={handleFormSubmit} >
      <div>
        title: <input value={newBlogTitle} onChange={handleTitleChange} />
      </div>
      <div>
        author: <input value={newBlogAuthor} onChange={handleAuthorChange} />
      </div>
      <div>
        url: <input value={newBlogUrl} onChange={handleUrlChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default AddBlog;
