const { userModel } = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jsonwebtoken');
const { SECRET } = require('../constants');

// exports.findByUsername = (username) => userModel.findOne({ username });

exports.getUserData = (userId) => userModel.findById(userId).lean();

exports.findByEmail = (email) => userModel.findOne({ email });

exports.register = async (email, password, rePass) => {
    if (password !== rePass) {
        throw new Error('Password mismatch!');
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
        throw new Error('User exists!');
    }

    if (password.length < 4) {
        throw new Error('Password too short!');
    };

    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.create({ username, email, password: hashedPassword });

    return this.login(username, password);
};

exports.login = async (email, password) => {
    const user = await this.findByEmail(email);
    if (!user) {
        throw new Error('Invalid username or password!');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Invalid username or password!');
    }

    const payload = {
        _id: user._id,
        email: user.email,
    };

    const token = await jwt.sign(payload, SECRET)

    return token;
};