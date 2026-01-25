import axios from 'axios';

const api = axios.create({
    baseURL: 'https://blog-pessoal-projeto-2myl.onrender.com',
});

export const cadastroUsuario = async <T,>(url: string, dados: T, setDados: (data: T) => void) => {
    const resposta = await api.post(url, dados);
    setDados(resposta.data);
}

export const login = async <T,>(url: string, dados: T, setDados: (data: T) => void) => {
    const resposta = await api.post(url, dados);
    setDados(resposta.data);
}