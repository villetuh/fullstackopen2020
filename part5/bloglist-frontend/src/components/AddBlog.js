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
    <form className='add-blog-form' onSubmit={handleFormSubmit} >
      <div>
        title: <input id='add-blog-title' value={newBlogTitle} onChange={handleTitleChange} />
      </div>
      <div>
        author: <input id='add-blog-author' value={newBlogAuthor} onChange={handleAuthorChange} />
      </div>
      <div>
        url: <input id='add-blog-url' value={newBlogUrl} onChange={handleUrlChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default AddBlog;
