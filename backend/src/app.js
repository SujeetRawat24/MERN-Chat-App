import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.route.js"
import { connectDB } from "./lib/db.js";
import { errorHandler } from "./middleware/errorHandler.middleware.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth/', authRoutes);

app.use(errorHandler );

app.listen(PORT, ()=> {
console.log(`Server running on http://localhost:${PORT}`);
connectDB();
})
