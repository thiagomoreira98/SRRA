module.exports = (req, res, next) => {

    res.error = (statusCode, message) => {
        res.status(statusCode).json({ message: message });
    }

    res.ok = (data) => {
        if (data.message)
            return res.status(200).json({ message: data.message });

        res.status(200).json({ content: data });
    }

    next();
}