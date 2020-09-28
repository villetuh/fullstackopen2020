import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import AddBlog from './AddBlog';

describe('<AddBlog />', () => {
  test('Form is submitted with correct data', () => {
    const onBlogAddedMockHandler = jest.fn();

    const component = render(
      <AddBlog onBlogAdded={onBlogAddedMockHandler} />
    );

    const titleInput = component.container.querySelector('#add-blog-title');
    const authorInput = component.container.querySelector('#add-blog-author');
    const urlInput = component.container.querySelector('#add-blog-url');

    fireEvent.change(titleInput, {
      target: { value: 'Just another blog post?' }
    });

    fireEvent.change(authorInput, {
      target: { value: 'Teemu Testaaja' }
    });

    fireEvent.change(urlInput, {
      target: { value: 'https://blog.test.com/just-another-blog' }
    });

    const form = component.container.querySelector('form');
    fireEvent.submit(form);

    expect(onBlogAddedMockHandler.mock.calls).toHaveLength(1);
    expect(onBlogAddedMockHandler).toHaveBeenLastCalledWith({
      author: 'Teemu Testaaja',
      title: 'Just another blog post?',
      url: 'https://blog.test.com/just-another-blog'
    });
  });
});
