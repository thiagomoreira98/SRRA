const config = {
    mongoDb: {
        user: '',
        password: '',
        server: '127.0.0.1',
        port: '27017',
        database: 'SRRAdev',
        connectionString: () => {
            return `mongodb://${config.mongoDb.server}:${config.mongoDb.port}/${config.mongoDb.database}`
        }

    },
    pgSQL: {
        user: process.env.POSTGRE_USER || 'postgres',
        password: process.env.POSTGRE_PASSWORD || '1234',
        host: process.env.POSTGRE_HOST || '127.0.0.1',
        port: process.env.POSTGRE_PORT || 5432,
        database: process.env.POSTGRE_DATABASE || 'srra'
    }, 
    host: '127.0.0.1',
    port: 7001
}

function init() {
    global.config = config;
}

module.exports = init();