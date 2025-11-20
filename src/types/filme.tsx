export interface Filme {
    id?: number;
    titulo: string;
    ano: number;
    genero: string;
    nota: number;
    tipo: 'filme' | 'serie';
}