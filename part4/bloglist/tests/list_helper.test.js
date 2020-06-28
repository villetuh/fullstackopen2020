const listHelper = require('../utils/list_helper');

describe('favorite blog', () => {
  const blogsList = [
    {
      _id: '1',
      title: 'Best potatoes for cassaroles',
      author: 'Teppo Töppönen',
      url: 'https://blog.pottu.com/Best-potatoes-for-cassaroles',
      likes: 2,
      __v: 0
    },
    {
      _id: '2',
      title: 'French or Belgian fries?',
      author: 'Jorma Teräs',
      url: 'https://blog.pottu.com/french-or-belgian-fries',
      likes: 5,
      __v: 0
    },
    {
      _id: '3',
      title: '10 things everyone should know about potatoes',
      author: 'Jorma Teräs',
      url: 'https://blog.pottu.com/10-things-about-potatoes',
      likes: 5,
      __v: 0
    },
    {
      _id: '4',
      title: '10 more things everyone should know about potatoes',
      author: 'Matti Meikäläinen',
      url: 'https://blog.pottu.com/10-more-things-about-potatoes',
      likes: 3,
      __v: 0
    }
  ];

  test('undefined list returns undefined favorite', () => {
    const result = listHelper.favoriteBlog(undefined);
    expect(result).toBeUndefined();
  });

  test('empty list returns undefined favorite', () => {
    const result = listHelper.favoriteBlog([]);
    expect(result).toBeUndefined();
  });

  test('first blog with most likes is selected as favorite', () => {
    const result = listHelper.favoriteBlog(blogsList);
    expect(result).toEqual(blogsList[1]);
  });
});

describe('most likes', () => {
  const blogsList = [
    {
      _id: '1',
      title: 'Best potatoes for cassaroles',
      author: 'Teppo Töppönen',
      url: 'https://blog.pottu.com/Best-potatoes-for-cassaroles',
      likes: 2,
      __v: 0
    },
    {
      _id: '2',
      title: 'French or Belgian fries?',
      author: 'Jorma Teräs',
      url: 'https://blog.pottu.com/french-or-belgian-fries',
      likes: 5,
      __v: 0
    },
    {
      _id: '3',
      title: '10 things everyone should know about potatoes',
      author: 'Jorma Teräs',
      url: 'https://blog.pottu.com/10-things-about-potatoes',
      likes: 5,
      __v: 0
    },
    {
      _id: '4',
      title: '10 more things everyone should know about potatoes',
      author: 'Matti Meikäläinen',
      url: 'https://blog.pottu.com/10-more-things-about-potatoes',
      likes: 3,
      __v: 0
    }
  ];

  test('undefined list returns undefined', () => {
    const result = listHelper.mostBlogs(undefined);
    expect(result).toBeUndefined();
  });

  test('empty list returns undefined', () => {
    const result = listHelper.mostBlogs([]);
    expect(result).toBeUndefined();
  });

  test('author with most blogs is returned', () => {
    const result = listHelper.mostBlogs(blogsList);
    expect(result).toEqual({ author: 'Jorma Teräs', blogs: 2 });
  });
});

describe('total likes', () => {
  const blogsList = [
    {
      _id: '1',
      title: '10 things everyone should know about potatoes',
      author: 'Jorma Teräs',
      url: 'https://blog.pottu.com/10-things-about-potatoes',
      likes: 5,
      __v: 0
    },
    {
      _id: '2',
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