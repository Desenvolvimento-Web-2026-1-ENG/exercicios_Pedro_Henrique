import { Router, Request, Response } from 'express';
import { TarefaFactory } from '@factories/TarefaFactory';

const router = Router();
const controller = TarefaFactory.criarController();

router.get('/tarefas', (req: Request, res: Response) => controller.listar(req, res));
router.get('/tarefas/:id', (req: Request, res: Response) => controller.buscar(req, res));
router.post('/tarefas', (req: Request, res: Response) => controller.criar(req, res));
router.put('/tarefas/:id', (req: Request, res: Response) => controller.atualizar(req, res));
router.delete('/tarefas/:id', (req: Request, res: Response) => controller.excluir(req, res));

export default router;
