module.exports = (app) => {
    
    app.get('/ping', (req, res) => {
        res.status(200).json({ message: 'Api Online', data: new Date() });
    });

    app.post('/ping', (req, res) => {
        console.log('body', req.body)
        res.status(200).json({ message: 'POST OK'});
    });
}