import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    },
    root: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String,
        default: "https://e7.pngegg.com/pngimages/404/557/png-clipart-user-logo-computer-icons-industry-icon-user-experience-room-logo.png"
    },
}, {
    timestamps: true
})

let Dataset = mongoose.models.user || mongoose.model('user', userSchema)
export default Dataset;