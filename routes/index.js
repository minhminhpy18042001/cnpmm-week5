const express = require('express');
const router = express.Router();
// const random = require('random');

let posts = [{
  id: '1',
  title: 'POST 1',
  content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  comments: [{
    id: '1',
    content: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.'
  }]
}, {
  id: '2',
  title: 'POST 2',
  content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  comments: [{
    id: '2',
    content: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.'
  }]
}, {
  id: '3',
  title: 'POST 3',
  content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  comments: [{
    id: '3',
    content: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.'
  }]
}, {
  id: '4',
  title: 'POST 4',
  content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  comments: [{
    id: '4',
    content: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.'
  }]
}, {
  id: '5',
  title: 'POST 5',
  content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  comments: [{
    id: '5',
    content: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.'
  }]
}, {
  id: '6',
  title: 'POST 6',
  content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  comments: [{
    id: '6',
    content: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.'
  }]
}, {
  id: '7',
  title: 'POST 7',
  content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  comments: [{
    id: '7',
    content: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.'
  }]
}, {
  id: '8',
  title: 'POST 8',
  content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  comments: [{
    id: '8',
    content: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.'
  }]
}];

router.get('/:id', function (req, res, next) {
  if (req.query.id) {
    const post = posts.filter(post => post.id === req.params.id).pop();
    post.comments.push({
      id: req.query.id,
      content: req.query.content
    });
    res.render('post', { post });
  } else if (req.query.delete) {
    posts = posts.filter(post => post.id !== req.params.id);
    res.render('index', { posts: posts });
  } else {
    res.render('post', { post: posts.filter(post => post.id === req.params.id).pop() });
  }
});

router.get('/', function (req, res, next) {
  if (req.query.id) {
    if (req.query.editorMode) {
      // edit
      posts.find(p => p.id === req.query.editorMode).id = req.query.id;
      posts.find(p => p.id === req.query.editorMode).title = req.query.title;
      posts.find(p => p.id === req.query.editorMode).content = req.query.content;
    } else {
      // add
      if (posts.filter(post => post.id === req.query.id).pop()) {
        res.render('error', { message: 'Duplicate id', error: { status: 400, stack: 'Line 78' } });
        return;
      }
      posts.push({
        id: req.query.id,
        title: req.query.title,
        content: req.query.content,
        comments: []
      });
    }
  } else if (req.query.editorMode) {
    res.render('index', { posts: posts, post: posts.filter(post => post.id === req.query.editorMode).pop() });
    return;
  }
  res.render('index', { posts: posts });
});

module.exports = router;
