//chamando as dependencias 

const mysql = require('mysql')

//configuracao da conexao com o banco de ddos 

const con = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    database: 'hoteis'
});

module.exports = {con}