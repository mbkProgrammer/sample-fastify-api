const postImageDecoder = (posts) => {
  const postArray = posts.map((post) => {
    const decodedImage = post.dataValues.image.toString('utf-8');
    const category = post.Category.dataValues;
    console.log('first', category);
    return {
      id: post.dataValues.id,
      title: post.dataValues.title,
      content: post.dataValues.content,
      category_id: post.dataValues.category_id,
      author: post.dataValues.author,
      created_at: post.dataValues.created_at,
      image: decodedImage,
      category,
    };
  });
  return postArray;
};

module.exports = postImageDecoder;
