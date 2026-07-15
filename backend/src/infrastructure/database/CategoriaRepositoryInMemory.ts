import { Categoria } from '@entities/Categoria';
import { ICategoriaRepository } from '@repositories/ICategoriaRepository';

export class CategoriaRepositoryInMemory implements ICategoriaRepository {
    private categorias: Categoria[] = [];
    private proximoId = 1;

    listarTodas(): Categoria[] {
        return this.categorias;
    }

    buscarPorId(id: number): Categoria | undefined {
        return this.categorias.find(c => c.id === id);
    }

    buscarPorNome(nome: string): Categoria | undefined {
        return this.categorias.find(
            c => c.nome.toLowerCase() === nome.toLowerCase()
        );
    }

    criar(dados: Omit<Categoria, 'id'>): Categoria {
        const novaCategoria: Categoria = {
            id: this.proximoId++,
            ...dados
        };

        this.categorias.push(novaCategoria);
        return novaCategoria;
    }

    atualizar(id: number, dados: Partial<Categoria>): Categoria | undefined {
        const index = this.categorias.findIndex(c => c.id === id);

        if (index === -1) {
            return undefined;
        }

        this.categorias[index] = {
            ...this.categorias[index],
            ...dados,
            id
        };

        return this.categorias[index];
    }

    excluir(id: number): boolean {
        const tamanhoInicial = this.categorias.length;

        this.categorias = this.categorias.filter(c => c.id !== id);

        return this.categorias.length < tamanhoInicial;
    }
}

export const categoriaRepositoryInMemory = new CategoriaRepositoryInMemory();