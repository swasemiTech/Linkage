import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    body: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    media: {
        type: String,
        default: ""
    },
    // If we found anything unusual in media, that user have uploaded, Then we cannot directly delete whole data of that user from database. So we basically flase The active parameter, so that the data of that use Will stay in the database But he cannot access his post.
    active: {
        type: Boolean,
        default: true
    },
    fileType: {
        type: String,
        default: ""
    }
})

const Post = mongoose.model("Post", PostSchema);

export default Post;