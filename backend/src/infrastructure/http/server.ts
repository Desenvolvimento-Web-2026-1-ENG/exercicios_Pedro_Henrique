import express from 'express';
import tarefasRoutes from './routes/tarefas.routes.js';

const app = express();

app.use(express.json());
app.use('/api', tarefasRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`\n✅ Servidor rodando na porta ${PORT}`);
    console.log(`🌐 Teste a API em: http://localhost:${PORT}/api/tarefas`);
});
