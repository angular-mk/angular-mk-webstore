var express = require('express');
var router = express.Router();

// Book Book Schema
const Email = require('../Schema/EmailSub.js');

router.post('/email', function(req, res) {

  Email.findOne({email: req.body.email}).exec(function(err, email) {
    if (email) {
      res.sendStatus(208);
    } else {
      var emailObj = new Email({
        email: req.body.email
      });

      emailObj.save(function(err, post) {
        if (err) {
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
    }
  });
});

// TODO: Fix the routes.

const Post = require('../Schema/Post.js');
const Comment = require('../Schema/Comment.js');

router.get('/posts', function(req, res) {
  Post.find({}, function(err, posts) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(posts);
    }
  });
});

router.get('/posts/:postId', function(req, res) {
  var postId = req.params.postId;

  Post.findById(postId).exec(function(err, post) {
    if (err) {
      res.sendStatus(500);
    } else if (!post) {
      res.sendStatus(404);
    } else {
      res.json(post);
    }
  });
});

// TODO: Not Visible ADMIN TESTING Only
router.post('/posts', function(req, res) {
    var newPost = new Post({
      title: req.query.title,
      preview: req.query.preview,
      content: req.query.content,
    });

    newPost.save(function(err, post) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json(post);
      }
    });
});

// get comment by id
router.get('/comments/:commentId', function(req, res) {
  var commentId = req.params.commentId;
  Comment.findById(commentId).exec(function(err, comment) {
    if (err) {
      res.sendStatus(500);
    } else if (!comment) {
      res.sendStatus(404);
    } else {
      res.json(comment);
    }
  });
});

// post comment to post id
router.post('/comments/:postId', function(req, res) {
  var postId = req.params.postId;
  Post.findById(postId).exec(function(err, post) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else if (!post) {
      res.sendStatus(404);
    } else {
      // Make new comment
      var newComment = new Comment({
        title: req.query.title,
        content: req.query.content
      });
      // acutal
      //var newComment = new Comment({
      //  title: req.body.title,
      //  content: req.body.content
      //});

      newComment.save(function(err, comment) {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } else if (!post) {
          res.sendStatus(404);
        } else {
          // Update post array
          post.comments.push(comment);
          post.save(function(err, finalPost) {
            if (err) {
              console.log(err);
              res.sendStatus(500);
            } else {
              res.json(finalPost);
            }
          });
        }
      });
    }
  });
});

module.exports = router;
