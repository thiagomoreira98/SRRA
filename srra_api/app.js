const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

require('./config/config.js');
require('devbox-response');

(function loadBodyParser() {
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
})();

(function loadMiddlewareCors() {
    app.use(cors());
    app.use(require('./src/api/middleware/response.js'));
})();

(function loadRoutes() {
    require('./src/api/route/pingRoute.js')(app);
    require('./src/api/route/setRoutes.js')(app);
})();

app.listen(global.config.port, () => {
    console.log(`SERVER LISTENING ON ${global.config.host}:${global.config.port}`);
});