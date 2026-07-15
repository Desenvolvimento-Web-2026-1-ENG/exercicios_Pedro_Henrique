import express from 'express';
import tarefasRoutes from './routes/tarefas.routes.js';
import categoriasRoutes from './routes/categorias.routes.js';

const app = express();

app.use(express.json());

app.use('/api', tarefasRoutes);
app.use('/api', categoriasRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`\n✅ Servidor rodando na porta ${PORT}`);
    console.log(`🌐 Tarefas: http://localhost:${PORT}/api/tarefas`);
    console.log(`🌐 Categorias: http://localhost:${PORT}/api/categorias`);
});