import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5137/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Função de exemplo (já existente)
export async function getReservasHojePorEspaco() {
  const { data } = await api.get<{ espaco: string; count: number }[]>(
    "/reservas/hoje/por-espaco"
  );
  return data;
}
