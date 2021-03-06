import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

const getDefaultBlog = () => {
  return {
    title: 'title of test blog',
    author: 'Adam Author',
    url: 'https://blog.test.com/test-blog',
    likes: 1
  };
};

describe('<Blog />', () => {

  test('renders only title and view details button when details aren\'t shown', () => {
    const blog = getDefaultBlog();

    const addLikeMockHandler = jest.fn();
    const deleteBlogMockHandler = jest.fn();

    const component = render(
      <Blog blog={blog} currentUser='' addLikeHandler={addLikeMockHandler} deleteBlogHandler={deleteBlogMockHandler} />
    );

    expect(component.container.querySelector('.blog-title'))
      .toHaveTextContent(blog.title);

    expect(component.container.querySelector('.blog-show-details-button'))
      .toHaveTextContent('view');

    expect(component.container.querySelector('.blog-url'))
      .toBeNull();

    expect(component.container.querySelector('blog-likes'))
      .toBeNull();

    expect(component.container.querySelector('blog-like-button'))
      .toBeNull();

    expect(component.container.querySelector('blog-author'))
      .toBeNull();

    expect(component.container.querySelector('blog-delete-button'))
      .toBeNull();
  });

  test('shows all the information after view details button is clicked', () => {
    const blog = getDefaultBlog();

    const addLikeMockHandler = jest.fn();
    const deleteBlogMockHandler = jest.fn();

    const component = render(
      <Blog blog={blog} currentUser='' addLikeHandler={addLikeMockHandler} deleteBlogHandler={deleteBlogMockHandler} />
    );

    fireEvent.click(component.getByText('view'));

    expect(component.container.querySelector('.blog-title'))
      .toHaveTextContent(blog.title);

    expect(component.container.querySelector('.blog-show-details-button'))
      .toHaveTextContent('hide');

    expect(component.container.querySelector('.blog-url'))
      .toHaveTextContent('url: ' + blog.url);

    expect(component.container.querySelector('.blog-likes'))
      .toHaveTextContent('likes: ' + blog.likes.toString());

    expect(component.container.querySelector('.blog-like-button'))
      .toHaveTextContent('like');

    expect(component.container.querySelector('.blog-author'))
      .toHaveTextContent(blog.author);

    expect(component.container.querySelector('.blog-delete-button'))
      .toHaveTextContent('Delete');
  });

  test('clicking like button twice invokes addLikeHandler twice', () => {
    const blog = getDefaultBlog();

    const addLikeMockHandler = jest.fn();
    const deleteBlogMockHandler = jest.fn();

    const component = render(
      <Blog blog={blog} currentUser='' addLikeHandler={addLikeMockHandler} deleteBlogHandler={deleteBlogMockHandler} />
    );

    fireEvent.click(component.getByText('view'));
    fireEvent.click(component.getByText('like'));
    fireEvent.click(component.getByText('like'));

    expect(addLikeMockHandler.mock.calls).toHaveLength(2);
  });
});
