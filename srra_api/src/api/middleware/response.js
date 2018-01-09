module.exports = (req, res, next) => {

    res.error = (statusCode, message) => {
        res.status(statusCode).json({ message: message });
    }

    res.ok = (statusCode, data) => {
        if (data.message)
            return res.status(statusCode).json({ message: data.message });

        res.status(statusCode).json({ content: data });
    }

    next();
}