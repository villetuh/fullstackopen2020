const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  const blogsList = [
    {
      _id: '5ef8751c1da04a36ac05de9a',
      title: '10 things everyone should know about potatoes',
      author: 'Jorma Teräs',
      url: 'https://blog.pottu.com/10-things-about-potatoes',
      likes: 5,
      __v: 0
    },
    {
      _id: '5ef8751c1da04a36ac05de9a',
      title: '10 more things everyone should know about potatoes',
      author: 'Matti Meikäläinen',
      url: 'https://blog.pottu.com/10-more-things-about-potatoes',
      likes: 3,
      __v: 0
    }
  ];

  test('undefined list returs 0 likes', () => {
    const result = listHelper.totalLikes(undefined);
    expect(result).toBe(0);
  });

  test('empty list returns 0 likes', () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });

  test('list of one blog returns likes of the blog', () => {
    const result = listHelper.totalLikes(blogsList.slice(0, 1));
    expect(result).toBe(5);
  });

  test('likes of multiple likes are summed together', () => {
    const result = listHelper.totalLikes(blogsList);
    expect(result).toBe(8);
  });
});