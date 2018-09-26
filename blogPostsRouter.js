const express = require("express");
const router = express.Router(); //creates a new Express router instance
const {BlogPosts} = require("./models"); //sets the models.js file as the location of the 'BlogPosts' array

BlogPosts.create("Blog post title #1", "Blog post content #1", "Blog post author #1");
BlogPosts.create("Blog post title #2", "Blog post content #2", "Blog post author #2");

//router statement to handle GET requests
router.get("/", (req, res) => {
  res.json(BlogPosts.get());
});

//router statement to handle POST requests
router.post("/", (req, res) => {
  const requiredFields = ["title", "content", "author"];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const item = BlogPosts.create(
    req.body.title,
    req.body.content,
    req.body.author
  );
  res.status(201).json(item);
});

//router statement to handle PUT requests
router.put("/:id", (req, res) => {
  const requiredFields = ["id", "title", "content", "author", "publishDate"];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    const message = `Request path id (${
      req.params.id
    }) and request body id ``(${req.body.id}) must match`;
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating blog post with id \`${req.params.id}\``);
  BlogPosts.update({
    id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    publishDate: req.body.publishDate
  });
  res.status(204).end();
});

//router statement to handle DELETE requests
router.delete("/:id", (req, res) => {
  BlogPosts.delete(req.params.id);
  console.log(`Deleted blog post with id \`${req.params.ID}\``);
  res.status(204).end();
});

module.exports = router; //exports router instance.  would this be similar to a 'return' statement except for routers?
                        //why is exporting the router instance necessary?