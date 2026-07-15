import { Categoria } from "@entities/Categoria";
import { ICategoriaRepository } from "@repositories/ICategoriaRepository";
import { CriarCategoriaDTO, AtualizarCategoriaDTO } from "./dtos/CategoriaDTOs";
import { ITarefaRepository } from '@repositories/ITarefaRepository';
import { Tarefa } from "@entities/Tarefa";

export class CategoriaService {
    constructor(
        private categoriaRepository: ICategoriaRepository,
        private tarefaRepository: ITarefaRepository
    ) {}

    listarTodas(): Categoria[] {
        return this.categoriaRepository.listarTodas();
    }

    buscarPorId(id: number): Categoria | undefined {
        return this.categoriaRepository.buscarPorId(id);
    }

    criar(dados: CriarCategoriaDTO): Categoria {
        const categoriaExistente = this.categoriaRepository.buscarPorNome(dados.nome);

        if (categoriaExistente) {
            throw new Error("Já existe uma categoria com esse nome.");
        }

        return this.categoriaRepository.criar(dados);
    }

    atualizar(id: number, dados: AtualizarCategoriaDTO): Categoria | undefined {
        if (dados.nome) {
            const categoriaExistente = this.categoriaRepository.buscarPorNome(dados.nome);

            if (categoriaExistente && categoriaExistente.id !== id) {
                throw new Error("Já existe uma categoria com esse nome.");
            }
        }

        return this.categoriaRepository.atualizar(id, dados);
    }

    excluir(id: number): boolean {

        const tarefas = this.tarefaRepository.listarTodas();

        const possuiTarefas = tarefas.some(
            (tarefa: Tarefa) => tarefa.categoriaId === id
        );

        if (possuiTarefas) {
            throw new Error(
                "Não é possível excluir uma categoria que possui tarefas."
            );
        }

        return this.categoriaRepository.excluir(id);
    }
}