// src/services/api.ts
import axios from 'axios';
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// Função para buscar reservas de hoje agrupadas por espaço
export async function getReservasHojePorEspaco() {
  const { data } = await api.get<{ espaco: string; count: number }[]>(
    "/reservas/hoje/por-espaco"
  );
  return data;
}