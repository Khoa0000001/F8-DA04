require('dotenv').config();
const jwt = require('jsonwebtoken');

const createJWT = (payload) => {
    let key = process.env.JWT_SECRET;
    if (!key) {
        console.error('JWT_SECRET is not defined.');
        return null;
    }
    let token = null;
    try {
        token = jwt.sign(payload, key, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
    } catch (err) {
        console.log('err JWT', err);
    }
    return token;
};

const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let data = null;
    try {
        let decoded = jwt.verify(token, key);
        data = decoded;
    } catch (err) {
        console.log('error verify token >>>>', err);
    }
    return data;
};

const checkUserJWT = (req, res, next) => {
    let cookie = req.cookies;
    if (cookie && cookie.jwt) {
        let token = cookie.jwt;
        let decoded = verifyToken(token);
        if (decoded) {
            req.user = decoded;
            next();
        } else {
            return res.status(401).json({
                type: 'error',
                message: 'Not authenticated the user token die',
            });
        }
    } else {
        return res.status(401).json({
            type: 'error',
            message: 'Not authenticated the user',
        });
    }
};

const checkUserPermission = (req, res, next) => {
    if (req.user) {
        let numberPhone = req.user.numberPhone;
        let roles = req.user.getGroupWithRole.roles;
        let currentUrl = req.currentUrl;
        console.log('currentUrl', currentUrl);
        if (!roles || roles.length === 0) {
            return res.status(403).json({
                type: 'error',
                message: `You don't have permission to access this resource`,
            });
        }
        let canAccess = roles.some((item) => item.url === currentUrl);
        if (canAccess == true) {
            next();
        } else {
            return res.status(403).json({
                type: 'error',
                message: `You don't have permission to access this resource`,
            });
        }
    } else {
        return res.status(401).json({
            type: 'error',
            message: 'Not authenticated the user',
        });
    }
};

module.exports = { createJWT, verifyToken, checkUserJWT, checkUserPermission };
