import mongoose from 'mongoose'

const educationSchema = new mongoose.Schema({
    school: {
        type: String,
        defualt: '',
    },
    degree: {
        type: String,
        defualt: '',
    },
    fieldOfStudy: {
        type: String,
        defualt: '',
    }
});

const workSchema = new mongoose.Schema({
    company: {
        type: String,
        defualt: '',
    },
    position: {
        type: String,
        default: '',
    },
    years: {
        type: String,
        defualt: '',
    },
});

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    bio: {
        type: String,
        default: '',
    },
    currentPost: {
        type: String,
        default: '',
    },
    pastWork: {
        type: [workSchema],
        default: [],
    },
    education: {
        type: [educationSchema],
        default: [],
    }
})

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
