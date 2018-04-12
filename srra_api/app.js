const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    config = require('./config/config'),
    app = express();

require('devbox-response');

//middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(require('./src/api/middleware/response'));

//routes
require('./src/api/routes/ping')(app);
require('./src/api/routes/set')(app);

app.listen(config.port, () => {
    console.log(`SERVER LISTENING ON ${config.port}`);
});