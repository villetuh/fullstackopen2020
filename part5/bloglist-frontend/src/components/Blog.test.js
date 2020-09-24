import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
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
});
