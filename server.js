const express = require('express');
const path =  require('path');

const app = express();
        
// define a pasta "public" como principal fixo
app.use(express.static(path.join(__dirname, 'public')));

// rota para a pagina inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'paginainicial.html'));
});

// rota para a pag Sobre
app.get('/sobre', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'sobre.html'));
});

// rota para a pag Solucoes
app.get('/solucoes', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'solucoes.html'));
});

// rota para a pag Contatos
app.get('/contatos', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'contatos.html'));
});

// rota não encontrada
app.use((req, res) => {
    res.status(404).send('<h1>Página não encontrada!</h1>');
});

// server
const DOOR = 3000;
app.listen(DOOR, () => {
    console.log(`Servidor a rodar em http://localhost:${DOOR}`);
});