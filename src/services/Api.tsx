import type { Filme } from '../types/Filme';

const API_URL = 'http://localhost:3001/filmes';

// --- READ (Listar) ---
export async function getFilmes() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Não foi possível buscar os dados.');
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    return null;
  }
}

// --- CREATE (Criar) ---
export async function createFilme(filme: Omit<Filme, 'id'>) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filme),
    });
    if (!response.ok) throw new Error('Erro ao cadastrar filme.');
    return await response.json();
  } catch (error) {
    console.error("Erro ao criar filme:", error);
    return null;
  }
}

// --- UPDATE (Atualizar - NOVO) ---
export async function updateFilme(id: string, filme: Omit<Filme, 'id'>) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT', // PUT substitui todo o objeto
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filme),
    });
    if (!response.ok) throw new Error('Erro ao atualizar filme.');
    return await response.json();
  } catch (error) {
    console.error("Erro ao atualizar filme:", error);
    return null;
  }
}

// --- DELETE (Excluir - NOVO) ---
export async function deleteFilme(id: string) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao excluir filme.');
    return true; // Retorna true se deu certo
  } catch (error) {
    console.error("Erro ao excluir filme:", error);
    return false;
  }
}