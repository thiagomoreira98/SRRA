const config = {
    pg: {
        host: process.env.PG_HOST || 'localhost',
        port: process.env.PG_PORT || 5432,
        user: process.env.PG_USER || 'postgres',
        password: process.env.PG_PASSWORD || '1234',
        database: process.env.PG_DATABASE || 'srra'
    },
    port: 7001,
    host: process.env.HOST || 'http://localhost'
}

module.exports = config;