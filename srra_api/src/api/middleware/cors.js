module.exports = (req, res, next) => {
    res.header('Content-Type', 'application/json; charset=utf-8');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Headers", req.headers['access-control-request-headers']);

    if (req.method === 'OPTIONS')
        return res.status(204).end();
        
    res.finish = (response, noNext) => {
        if (response.statusCode != 200)
            res.errors = response;

        res.status(response.statusCode).json(response);
        if (!noNext) next();
    };
    next();
};