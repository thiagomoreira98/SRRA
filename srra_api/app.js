const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./config/database');

require('devbox-response');
require('./config/config.js');

db(global.config.mongoDb.connectionString());

(function loadBodyParser() {
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
})();

(function loadMiddleware() {
    app.use(require('./src/api/middleware/cors.js'));
})();

(function loadRoutes() {
    require('./src/api/route/pingRoute.js')(app);
    require('./src/api/route/setRoutes.js')(app);
})();

app.listen(global.config.port, () => {
    console.log('SERVER ON localhost:', global.config.port);
})