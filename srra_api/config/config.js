const config = {
    pg: {
        user: process.env.PG_USER || 'postgres',
        password: process.env.PG_PASSWORD || '1234',
        host: process.env.PG_HOST || '127.0.0.1',
        port: process.env.PG_PORT || 5432,
        database: process.env.PG_DATABASE || 'srra'
    }, 
    host: process.env.HOST || 'http://localhost',
    port: process.env.PORT || 7002,
    seguranca: {
        host: process.env.SEGURANCA_HOST || 'http://localhost',
        port: process.env.SEGURANCA_PORT || 7001
    }
}

module.exports = config;