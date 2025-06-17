import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";
import { connectDB } from "./config/db.js";
import nodemailer  from 'nodemailer';

const app = express();
connectDB();
console.log(connectDB)
app.use(cors(), express.json());
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/uploads", express.static("uploads"));
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields required' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'yourgmail@gmail.com',
      pass: 'your-app-password', // use App Password if using Gmail
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: 'newscovry@gmail.com',
      subject: `Contact Form: ${subject}`,
      text: `${message}\n\nFrom: ${name} <${email}>`,
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send email' });
  }
});
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
