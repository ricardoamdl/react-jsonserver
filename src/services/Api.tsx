import type { Filme } from '../types/Filme';

const API_URL = 'https://localhost:3001/filmes';

//busca a lista de filmes na API
export async function getFilmes() {
    try {
        const response = await fetch(API_URL);

        //se a resposta não for ok (ex: erro 500), lança um erro
        if  (!response.ok) {
            throw new Error('Não foi possível buscar os dados.');
        }

        //converte a resposta para JSON e retorna
        return await response.json();
    } catch (error) {
        //em caso de erro na rede ou no featch< exibe no console
        console.error("Erro ao buscar filmes:", error);
        //retorna 'null' para a pagina saber que deu erro
        return null;
    }
}

export async function createFilme(filme: Omit<Filme, 'id'>) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filme),
    });

    if (!response.ok) {
      throw new Error('Erro ao cadastrar filme.');
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao criar filme:", error);
    return null;
  }
}