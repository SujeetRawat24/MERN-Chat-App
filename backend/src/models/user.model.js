import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: [true,"Email is required"],
        unique: true,
        trim: true,
        match: [/\S+@\S+\.\S+/ , 'Please fill a valid email address' ],
    },

    fullName: {
        type: String,
        required: [true,"User name is required"],
        minLength: 3,
        maxLength: 50,
        trim: true,
    },

    password: {
        type: String,
        required: [true,"Password is required"],
        minLength:6,
    },

    profilePic: {
        type: String,
        default: ''
    }
    
}, { timestamps: true });

userSchema.pre('save', function (next) {
    if (this.isModified('email')) {
        this.email = this.email.toLowerCase();
    }
    next();
});

const User = mongoose.model('User', userSchema);

export default User;