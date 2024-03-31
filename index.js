const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors'); // Importe o pacote cors
const sql = require('mssql');
const port = 3000;
var timestamp = 0
app.use(cors());
app.use(bodyParser.json());


// Configuração do banco de dados
const config = {
    driver: 'SQL Server',
    user: 'kaleologin',
    password: 'Gislaine470@',
    server: '192.168.0.102\\KALEOSERVER2',
    database: 'tempdb',
    options: {
        encrypt: false // Desabilitar a verificação de certificado
    }
};


app.post('/inserir_dados', async (req, res) => {
    try {
        // Desestruturando os dados do corpo da requisição
        const { query } = req.body;
        
        // Conectando ao banco de dados
        await sql.connect(config);

        // Definindo a consulta SQL de inserção

        console.log(query)

        // Executando a consulta de inserção
        await sql.query(query);

        console.log('Valores inseridos com sucesso na tabela.');
        res.sendStatus(200);
    } catch (error) {
        console.error('Erro ao inserir valores na tabela:', error);
        res.sendStatus(500);
    } finally {
        // Fechando a conexão com o banco de dados
        await sql.close();
    }

})




// Rota para a página inicial
app.get('/home', (req, res) => {
  res.send('Bem-vindo à página inicial!');
});


// Porta para o servidor escutar
const PORT = process.env.PORT || 9002;

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado em http://localhost:${PORT}`);
});
