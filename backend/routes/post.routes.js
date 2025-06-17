import express from "express";
import multer from "multer";
import { protect } from "../middleware/auth.js";
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-newscovry-" + file.originalname),
});

const upload = multer({ storage });

app.post("/upload", upload.single("image"), (req, res) => {
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;
  res.json({ imageUrl });
});

// const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.get("/getallpost", getPosts);
router.get("/:id", getPost);
router.post("/postcreate", protect, upload.single("image"), createPost);
router.put("/:id", protect, upload.single("image"), updatePost);
router.delete("/:id", protect, deletePost);



export default router;
