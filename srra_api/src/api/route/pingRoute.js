module.exports = (app) => {
    
    app.get('/ping', (req, res) => {
        res.json({
            statusCode: 200,
            data: new Date()
        });
    });
}