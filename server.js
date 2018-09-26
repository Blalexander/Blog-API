const express = require("express");
const morgan = require("morgan");

const blogPostsRouter = require("./blogPostsRouter"); //this statement imports blogPostsRouter and allows use of it
const app = express();

app.use(morgan("common"));
app.use(express.json());

app.use("/blog-posts", blogPostsRouter); //when '/blog-posts' is appended to the url, the request is forwarded to the blogPostsRouter js file for processing

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});