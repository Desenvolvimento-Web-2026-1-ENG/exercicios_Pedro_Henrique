export interface CriarTarefaDTO {
    titulo: string;
    descricao?: string;
}

export interface AtualizarTarefaDTO {
    titulo?: string;
    descricao?: string;
    concluida?: boolean;
}
