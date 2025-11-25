export interface Filme {
    id?: string; 
    titulo: string;
    ano: number;
    genero: string;
    nota: number;
    tipo: 'filme' | 'serie';
    imagemUrl?: string;
}