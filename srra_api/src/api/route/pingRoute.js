module.exports = (app) => {
    
    app.get('/ping', (req, res) => {
        res.status(200).json({ data: new Date() });
    });
}