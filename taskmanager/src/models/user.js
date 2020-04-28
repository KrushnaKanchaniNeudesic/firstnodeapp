const mongoose = require('mongoose');
const validator = require('validator');
const bycrypt = require('bcrypt');
const jsonWeb = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});


userSchema.statics.generateAuthToken = async function (user) {
    const token = jsonWeb.sign({ _id: user._id.toString() }, "key");
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}

userSchema.statics.findByCredentials = async (email, password) => {

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Unable to login');
    }

    const isMatch = await bycrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Unable to login');
    }

    return user;

}


userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bycrypt.hash(user.password, 8);
    }
    next();
})

const User = mongoose.model('user', userSchema);

module.exports = User;