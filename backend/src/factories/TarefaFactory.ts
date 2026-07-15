import { TarefaController } from '@interfaces/controllers/TarefaController';
import { TarefaService } from '@services/TarefaService';
import { TarefaRepositoryInMemory } from '@infrastructure/database/TarefaRepositoryInMemory';

export class TarefaFactory {
    static criarController(): TarefaController {
        const repository = new TarefaRepositoryInMemory();
        const service = new TarefaService(repository);
        const controller = new TarefaController(service);
        
        return controller;
    }
}
