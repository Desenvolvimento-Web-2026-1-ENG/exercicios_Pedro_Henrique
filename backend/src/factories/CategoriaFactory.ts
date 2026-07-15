import { CategoriaController } from '@interfaces/controllers/CategoriaController';
import { CategoriaService } from '@services/CategoriaService';
import { categoriaRepositoryInMemory } from '@infrastructure/database/CategoriaRepositoryInMemory';
import { tarefaRepositoryInMemory } from '@infrastructure/database/TarefaRepositoryInMemory';

export class CategoriaFactory {
    static criarController(): CategoriaController {
        const service = new CategoriaService(
            categoriaRepositoryInMemory,
            tarefaRepositoryInMemory
        );

        return new CategoriaController(service);
    }
}