import express from "express"
import { authorize } from "../middleware/auth.middleware.js";
import { getMessages, getUserForSidebar, sendMessages } from "../controllers/message.controller.js";

const router= express.Router();

// Route to get users for the sidebar
router.get("/users", authorize, getUserForSidebar);

// Route to get messages for a specific chat
router.get("/:id", authorize, getMessages);

// Route to send a message to a specific chat
router.post("/send/:id", authorize, sendMessages);


export default router;