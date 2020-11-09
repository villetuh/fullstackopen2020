import blogService from '../services/blogs';

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data];
    case 'INIT_BLOGS':
      return action.data;
    case 'UPDATE_BLOG':
      return state.map(blog => blog.id === action.data.id
        ? action.data
        : blog);
    case 'REMOVE_BLOG':
      return state.filter(blog => blog.id !== action.data.id);
    default:
      return state;
  }
};

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    });
  };
};

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog);
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    });
  };
};

export const likeBlog = (blog) => {
  return async dispatch => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    };
    const newBlog = await blogService.update(updatedBlog);

    dispatch({
      type: 'UPDATE_BLOG',
      data: newBlog
    });
  };
};

export const deleteBlog = (blog) => {
  return async dispatch => {
    await blogService.remove(blog);

    dispatch({
      type: 'REMOVE_BLOG',
      data: blog
    });
  };
};

export default blogReducer;
