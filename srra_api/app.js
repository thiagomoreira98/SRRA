const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const db = require('./config/database');

require('./config/config.js');

db(global.config.mongoDb.connectionString());

(function loadBodyParser() {
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
})();

(function loadMiddleware() {
    app.use(cors());
})();

(function loadRoutes() {
    require('./src/api/route/pingRoute.js')(app);
    require('./src/api/route/docenteRoute.js')(app);
    require('./src/api/route/recursoRoute.js')(app);
    require('./src/api/route/laboratorioRoute.js')(app);
    require('./src/api/route/ocorrenciaRoute.js')(app);
})();

app.listen(global.config.port, () => {
    console.log(`SERVER LISTENING ON ${global.config.host}:${global.config.port}`);
});