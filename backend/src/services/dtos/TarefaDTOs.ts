export interface CriarTarefaDTO {
    titulo: string;
    descricao?: string;
    categoriaId?:number;
}

export interface AtualizarTarefaDTO {
    titulo?: string;
    descricao?: string;
    concluida?: boolean;
    categoriaId?:number;
}
