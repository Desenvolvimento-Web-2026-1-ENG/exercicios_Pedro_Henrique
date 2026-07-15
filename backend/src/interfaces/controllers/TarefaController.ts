import { Request, Response } from 'express';
import { TarefaService } from '@services/TarefaService';
import { CriarTarefaDTO, AtualizarTarefaDTO } from '@services/dtos/TarefaDTOs';

export class TarefaController {
    constructor(private tarefaService: TarefaService) {}

    listar(req: Request, res: Response): void {
        const tarefas = this.tarefaService.listarTodas();
        res.json(tarefas);
    }

    buscar(req: Request, res: Response): void {
        const id = parseInt(req.params.id);
        const tarefa = this.tarefaService.buscarPorId(id);

        if (!tarefa) {
            res.status(404).json({ erro: 'Tarefa não encontrada' });
            return;
        }
        res.json(tarefa);
    }

    criar(req: Request, res: Response): void {
        try {
            const tarefa = this.tarefaService.criar(req.body);

            res.status(201).json(tarefa);

        } catch (error) {
            res.status(400).json({
                erro: (error as Error).message
            });
        }
    }

    atualizar(req: Request, res: Response): void {
        const id = parseInt(req.params.id);
        const dadosAtualizados: AtualizarTarefaDTO = req.body;
        
        const tarefaAtualizada = this.tarefaService.atualizar(id, dadosAtualizados);

        if (!tarefaAtualizada) {
            res.status(404).json({ erro: 'Tarefa não encontrada para atualização' });
            return;
        }
        res.json(tarefaAtualizada);
    }

    excluir(req: Request, res: Response): void {
        const id = parseInt(req.params.id);
        const excluiu = this.tarefaService.excluir(id);

        if (!excluiu) {
            res.status(404).json({ erro: 'Tarefa não encontrada para exclusão' });
            return;
        }
        res.status(204).send();
    }
}
