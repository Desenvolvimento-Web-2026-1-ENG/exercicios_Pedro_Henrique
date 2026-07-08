import express from "express";
const PORTA = 3000;
const app = express();
app.use(express.json());
app.get('/api/status', (req, res) => {
    res.status(200).json({
        status: 'Online',
        mensagem: 'Meu primeiro servidor Node.js funciona!'
    });
});
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'Healthy',
        mensagem: 'O servidor está saudável e funcionando corretamente!'
    });
});
// Iniciando o servidor na porta definida
app.listen(PORTA, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORTA}`);
});