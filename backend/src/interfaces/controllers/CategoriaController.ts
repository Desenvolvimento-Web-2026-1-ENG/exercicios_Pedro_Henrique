import { Request, Response } from 'express';
import { CategoriaService } from '@services/CategoriaService';
import { CriarCategoriaDTO, AtualizarCategoriaDTO } from '@services/dtos/CategoriaDTOs';

export class CategoriaController {
    constructor(private categoriaService: CategoriaService) {}

    listar(req: Request, res: Response): void {
        const categorias = this.categoriaService.listarTodas();
        res.json(categorias);
    }

    buscar(req: Request, res: Response): void {
        const id = parseInt(req.params.id);
        const categoria = this.categoriaService.buscarPorId(id);

        if (!categoria) {
            res.status(404).json({ erro: 'Categoria não encontrada' });
            return;
        }

        res.json(categoria);
    }

    criar(req: Request, res: Response): void {
        const dados: CriarCategoriaDTO = req.body;

        if (!dados.nome) {
            res.status(400).json({ erro: 'O nome da categoria é obrigatório' });
            return;
        }

        try {
            const novaCategoria = this.categoriaService.criar(dados);
            res.status(201).json(novaCategoria);
        } catch (error: any) {
            res.status(400).json({ erro: error.message });
        }
    }

    atualizar(req: Request, res: Response): void {
        const id = parseInt(req.params.id);
        const dadosAtualizados: AtualizarCategoriaDTO = req.body;

        try {
            const categoriaAtualizada = this.categoriaService.atualizar(id, dadosAtualizados);

            if (!categoriaAtualizada) {
                res.status(404).json({ erro: 'Categoria não encontrada para atualização' });
                return;
            }

            res.json(categoriaAtualizada);
        } catch (error: any) {
            res.status(400).json({ erro: error.message });
        }
    }

    excluir(req: Request, res: Response): void {
        const id = parseInt(req.params.id);

        try {
            const excluiu = this.categoriaService.excluir(id);

            if (!excluiu) {
                res.status(404).json({ erro: 'Categoria não encontrada para exclusão' });
                return;
            }

            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ erro: error.message });
        }
    }
}