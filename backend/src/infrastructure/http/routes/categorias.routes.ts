import { Router, Request, Response } from 'express';
import { CategoriaFactory } from '@factories/CategoriaFactory';

const router = Router();
const controller = CategoriaFactory.criarController();

router.get('/categorias', (req: Request, res: Response) => controller.listar(req, res));
router.get('/categorias/:id', (req: Request, res: Response) => controller.buscar(req, res));
router.post('/categorias', (req: Request, res: Response) => controller.criar(req, res));
router.put('/categorias/:id', (req: Request, res: Response) => controller.atualizar(req, res));
router.delete('/categorias/:id', (req: Request, res: Response) => controller.excluir(req, res));

export default router;