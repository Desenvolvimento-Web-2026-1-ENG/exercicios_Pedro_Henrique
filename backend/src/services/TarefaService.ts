import { Tarefa } from '@entities/Tarefa';
import { ITarefaRepository } from '@repositories/ITarefaRepository';
import { CriarTarefaDTO, AtualizarTarefaDTO } from './dtos/TarefaDTOs.js';

export class TarefaService {
    constructor(private tarefaRepository: ITarefaRepository) {}

    listarTodas(): Tarefa[] {
        return this.tarefaRepository.listarTodas();
    }

    buscarPorId(id: number): Tarefa | undefined {
        return this.tarefaRepository.buscarPorId(id);
    }

    criar(dados: CriarTarefaDTO): Tarefa {
        return this.tarefaRepository.criar({
            titulo: dados.titulo,
            descricao: dados.descricao,
            concluida: false
        });
    }

    atualizar(id: number, dadosAtualizados: AtualizarTarefaDTO): Tarefa | undefined {
        return this.tarefaRepository.atualizar(id, dadosAtualizados);
    }

    excluir(id: number): boolean {
        return this.tarefaRepository.excluir(id);
    }
}
