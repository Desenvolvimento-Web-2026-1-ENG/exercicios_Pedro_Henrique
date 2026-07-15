import { TarefaController } from '@interfaces/controllers/TarefaController';
import { TarefaService } from '@services/TarefaService';
import { tarefaRepositoryInMemory } from '@infrastructure/database/TarefaRepositoryInMemory';
import { categoriaRepositoryInMemory } from '@infrastructure/database/CategoriaRepositoryInMemory';

export class TarefaFactory {
    static criarController(): TarefaController {
        const service = new TarefaService(
            tarefaRepositoryInMemory,      
            categoriaRepositoryInMemory   
        );

        return new TarefaController(service);
    }
}