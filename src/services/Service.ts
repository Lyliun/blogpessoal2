/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const cadastroUsuario = async <T>(
  url: string,
  dados: T,
  setDados: (data: T) => void
) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};

export const login = async <T>(
  url: string,
  dados: T,
  setDados: (data: T) => void
) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};

export const buscar = async (
  url: string,
  setDados: Function,
  header: object
) => {
  const resposta = await api.get(url, header);
  setDados(resposta.data);
};

export const deletar = async (url: string, header: object) => {
  await api.delete(url, header);
};
