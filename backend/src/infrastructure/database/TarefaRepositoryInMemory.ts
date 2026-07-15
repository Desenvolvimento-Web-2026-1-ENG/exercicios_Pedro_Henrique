import { Tarefa } from '@entities/Tarefa';
import { ITarefaRepository } from '@repositories/ITarefaRepository';

export class TarefaRepositoryInMemory implements ITarefaRepository {
    private tarefas: Tarefa[] = [];
    private proximoId = 1;

    listarTodas(): Tarefa[] {
        return this.tarefas;
    }

    buscarPorId(id: number): Tarefa | undefined {
        return this.tarefas.find(t => t.id === id);
    }

    buscarPorCategoria(categoriaId: number): Tarefa[] {
        return this.tarefas.filter(t => t.categoriaId === categoriaId);
    }

    criar(dados: Omit<Tarefa, 'id'>): Tarefa {
        const novaTarefa: Tarefa = {
            id: this.proximoId++,
            ...dados
        };
        this.tarefas.push(novaTarefa);
        return novaTarefa;
    }

    atualizar(id: number, dados: Partial<Tarefa>): Tarefa | undefined {
        const index = this.tarefas.findIndex(t => t.id === id);
        if (index === -1) return undefined;

        this.tarefas[index] = { ...this.tarefas[index], ...dados, id };
        return this.tarefas[index];
    }

    excluir(id: number): boolean {
        const tamanhoInicial = this.tarefas.length;
        this.tarefas = this.tarefas.filter(t => t.id !== id);
        return this.tarefas.length < tamanhoInicial;
    }
}

export const tarefaRepositoryInMemory = new TarefaRepositoryInMemory();