export interface CriarCategoriaDTO {
    nome: string;
    cor: string;
}

export interface AtualizarCategoriaDTO {
    nome?: string;
    cor?: string;
}