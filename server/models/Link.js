import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
    },
    clicks: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastClicked: {
        type: Date
    }
});

linkSchema.pre('save', function (next) {
    if (this.isModified('code')) {
        this.code = this.code.toUpperCase();
    }
    next();
});

const Link = mongoose.model('Link', linkSchema);

export default Link;