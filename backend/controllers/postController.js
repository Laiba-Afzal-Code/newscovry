import Post from "../models/Post.js";

export const getPosts = async (_, res) => {
  const posts = await Post.find();
  res.json(posts);
};

export const getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ msg: "Post not found" });
  res.json(post);
};
// CREATE POST
export const createPost = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const author = req.user.name;

    // Build full image URL if file uploaded
    const image = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : null;

    const post = await Post.create({ title, content, category, author, image });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: "Failed to create post" });
  }
};

// UPDATE POST
export const updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });

    // Use old image if no new file is uploaded
    const updatedImage = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : post.image;

    post.title = title || post.title;
    post.content = content || post.content;
    post.image = updatedImage;

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Failed to update post" });
  }
};

export const deletePost = async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) return res.status(404).json({ msg: "Post not found" });
  res.json({ msg: "Deleted" });
};
