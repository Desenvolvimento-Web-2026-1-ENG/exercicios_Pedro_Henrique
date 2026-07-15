import { CategoriaRepositoryInMemory } from './CategoriaRepositoryInMemory';
import { TarefaRepositoryInMemory } from './TarefaRepositoryInMemory';


export const categoriaRepository = new CategoriaRepositoryInMemory();

export const tarefaRepository = new TarefaRepositoryInMemory();