import express, { type Request, type Response } from "express";

const PORTA = 3000;
const app = express();

app.use(express.json());

interface Tarefa {
  id: string;
  titulo: string;
  descricao?: string; 
  concluida: boolean;
}

let tarefas: Tarefa[] = [
  {
    id: "1",
    titulo: "Estudar TypeScript",
    descricao: "Finalizar os exercícios de rotas da API",
    concluida: false
  }
];

app.get('/api/status', (req: Request, res: Response) => {
  res.status(200).json({ 
    status: 'Online', 
    mensagem: 'Meu primeiro servidor Node.js funciona!' 
  });
});

app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ 
    status: 'Healthy', 
    mensagem: 'O servidor está saudável e funcionando corretamente!' 
  });
});

// Listar todas as tarefas
app.get('/api/tarefas', (req: Request, res: Response) => {
  res.status(200).json(tarefas);
});

// Buscar uma tarefa específica
app.get('/api/tarefas/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const tarefa = tarefas.find(t => t.id === id);

  if (!tarefa) {
    res.status(404).json({ mensagem: "Tarefa não encontrada." });
    return;
  }

  res.status(200).json(tarefa);
});

// Cadastrar uma nova tarefa
app.post('/api/tarefas', (req: Request, res: Response) => {
  const { titulo, descricao } = req.body;

  if (!titulo) {
    res.status(400).json({ mensagem: "O título é obrigatório." });
    return;
  }

  const novaTarefa: Tarefa = {
    id: crypto.randomUUID(), 
    titulo,
    descricao,
    concluida: false 
  };

  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

// Atualizar dados de uma tarefa existente
app.put('/api/tarefas/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { titulo, descricao, concluida } = req.body;

  const tarefaExistente = tarefas.find(t => t.id === id);

  if (!tarefaExistente) {
    res.status(404).json({ mensagem: "Tarefa não encontrada para atualização." });
    return;
  }

  const tarefaAtualizada: Tarefa = {
    ...tarefaExistente,
    titulo: titulo !== undefined ? titulo : tarefaExistente.titulo,
    descricao: descricao !== undefined ? descricao : tarefaExistente.descricao,
    concluida: concluida !== undefined ? concluida : tarefaExistente.concluida,
  };

  tarefas = tarefas.map(t => t.id === id ? tarefaAtualizada : t);
  res.status(200).json(tarefaAtualizada);
});

// Remover uma tarefa da lista
app.delete('/api/tarefas/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const tarefaIndex = tarefas.findIndex(t => t.id === id);

  if (tarefaIndex === -1) {
    res.status(404).json({ mensagem: "Tarefa não encontrada para exclusão." });
    return;
  }

  tarefas.splice(tarefaIndex, 1);
  res.status(204).send();
});

app.listen(PORTA, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORTA}`);
});