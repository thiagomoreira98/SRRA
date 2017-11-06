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
    host: '127.0.0.1',
    port: 7001
}

function init() {
    global.config = config;
}

module.exports = init();