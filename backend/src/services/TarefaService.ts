import { Tarefa } from '@entities/Tarefa';
import { ITarefaRepository } from '@repositories/ITarefaRepository';
import { CriarTarefaDTO, AtualizarTarefaDTO } from './dtos/TarefaDTOs.js';
import { ICategoriaRepository } from '@repositories/ICategoriaRepository';

export class TarefaService {
    constructor(
        private tarefaRepository: ITarefaRepository,
        private categoriaRepository: ICategoriaRepository
    ) {}

    listarTodas(): Tarefa[] {
        return this.tarefaRepository.listarTodas();
    }

    buscarPorId(id: number): Tarefa | undefined {
        return this.tarefaRepository.buscarPorId(id);
    }

    criar(dados: CriarTarefaDTO): Tarefa {

        if (dados.categoriaId !== undefined) {

            const categoria =
                this.categoriaRepository.buscarPorId(dados.categoriaId);

            if (!categoria) {
                throw new Error("Categoria não encontrada.");
            }
        }

        return this.tarefaRepository.criar({
            titulo: dados.titulo,
            descricao: dados.descricao,
            concluida: false,
            categoriaId: dados.categoriaId
        });
    }

    atualizar(id: number, dadosAtualizados: AtualizarTarefaDTO): Tarefa | undefined {

        if (dadosAtualizados.categoriaId !== undefined) {

            const categoria =
                this.categoriaRepository.buscarPorId(dadosAtualizados.categoriaId);

            if (!categoria) {
                throw new Error("Categoria não encontrada.");
            }
        }

        return this.tarefaRepository.atualizar(id, dadosAtualizados);
    }

    excluir(id: number): boolean {
        return this.tarefaRepository.excluir(id);
    }
}
