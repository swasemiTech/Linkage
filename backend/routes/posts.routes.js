import { Router } from "express";
import { activeCheck } from "../controllers/posts.controller.js";
import multer from "multer";
import { createPost, getAllPosts, deletePost } from "../controllers/posts.controller.js";

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/posts");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });

router.route("/").get(activeCheck);
router.route("/post").post(upload.single("media"), createPost);
router.route("/posts").get(getAllPosts);// activeCheck middleware is used to check if the user is active
router.route("/delete_post").post(deletePost);


export default router;