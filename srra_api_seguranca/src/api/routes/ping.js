module.exports = (app) => {

    app.get('/ping', (req, res) => {
        res.status(200).json({
            message: 'API SEGURANCA ONLINE',
            date: new Date()    
        });
    });
}