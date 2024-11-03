const stripApiPrefix = (prefix) => {
    return (req, res, next) => {
        if (req.originalUrl.startsWith(prefix)) {
            req.currentUrl = req.originalUrl.slice(prefix.length);
        }
        next();
    };
};

module.exports = stripApiPrefix;
