const mongoose = require('mongoose');

module.exports = function(uri) {
    // URI = Universal Resource Identificator
    mongoose.connect(uri, {useMongoClient: true});
 
    mongoose.connection.on('connected', () => {
       console.log('Mongoose! conectado a ' + uri);
    });
 
    mongoose.connection.on('disconnected', () => {
       console.log('Mongoose! desconectado de ' + uri);
    });
 
    mongoose.connection.on('error', (erro) => {
       console.log('Mongoose! Erro de conexão: ' + erro);
    });
 
    process.on('SIGINT', () => {
       mongoose.connection.close( () => {
          console.log('Mongoose! encerrado pelo término da aplicação');
          process.exit(0); // Suicida-se; 0 significa saída sem erros
       });
    });
 
}