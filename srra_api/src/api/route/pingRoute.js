module.exports = (app) => {
    
    app.get('/ping', (req, res) => {
        res.status(200).json({ message: 'Api Online', data: new Date() });
    });
}