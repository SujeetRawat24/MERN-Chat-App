import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";

import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import { connectDB } from "./lib/db.js";
import { errorHandler } from "./middleware/errorHandler.middleware.js";
import { app, server} from "./lib/socket.js";

dotenv.config();


const PORT = process.env.PORT || 5001;
const _dirname = path.resolve();

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
  origin: "http://localhost:5173",
  credentials: true,
})
);

app.use('/api/auth/', authRoutes);
app.use('/api/messages/', messageRoutes);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(_dirname, "../frontend/dist")));

  app.get("*", (req,res) => {
    res.sendFile(path.join(_dirname, "../frontend", "dist", "index.html"));
  })
}

app.use(errorHandler );

const startServer = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
