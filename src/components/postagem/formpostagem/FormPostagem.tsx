import {
  type ChangeEvent,
  type FormEvent,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { SyncLoader } from 'react-spinners';

import { AuthContext } from '../../../contexts/AuthContext';
import type Postagem from '../../../models/Postagem';
import type Tema from '../../../models/Tema';
import { buscar } from '../../../services/Service';

const API_URL = 'https://blog-pessoal-projeto-2myl.onrender.com';

function FormPostagem() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [temas, setTemas] = useState<Tema[]>([]);
  const [tema, setTema] = useState<Tema>({ id: 0, descricao: '' });
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem);

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  /* ================= BUSCAS ================= */

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const buscarPostagemPorId = async (postagemId: string) => {
    try {
      await buscar(`/postagens/${postagemId}`, setPostagem, {
        headers: { Authorization: token },
      });
    } catch (error) {
      if (String(error).includes('401')) {
        handleLogout();
      }
    }
  };

  const buscarTemaPorId = async (temaId: string) => {
    try {
      await buscar(`/temas/${temaId}`, setTema, {
        headers: { Authorization: token },
      });
    } catch (error) {
      if (String(error).includes('401')) {
        handleLogout();
      }
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const buscarTemas = async () => {
    try {
      await buscar('/temas', setTemas, {
        headers: { Authorization: token },
      });
    } catch (error) {
      if (String(error).includes('401')) {
        handleLogout();
      }
    }
  };

  /* ================= EFFECTS ================= */

  useEffect(() => {
    if (token === '') {
      alert('Você precisa estar logado');
      navigate('/');
    }
  }, [token, navigate]);

  useEffect(() => {
    buscarTemas();

    if (id !== undefined) {
      buscarPostagemPorId(id);
    }
  }, [buscarPostagemPorId, buscarTemas, id]);

  useEffect(() => {
    setPostagem((postagemAtual) => ({
      ...postagemAtual,
      tema,
      usuario,
    }));
  }, [tema, usuario]);

  /* ================= HANDLERS ================= */

  const atualizarEstado = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setPostagem((postagemAtual) => ({
      ...postagemAtual,
      [name]: value,
      tema,
      usuario,
    }));
  };

  const retornar = () => {
    navigate('/postagens');
  };

  const gerarNovaPostagem = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (id !== undefined) {
        await axios.put(`${API_URL}/postagens`, postagem, {
          headers: { Authorization: token },
        });
        alert('Postagem atualizada com sucesso');
      } else {
        await axios.post(`${API_URL}/postagens`, postagem, {
          headers: { Authorization: token },
        });
        alert('Postagem cadastrada com sucesso');
      }
    } catch (error) {
      if (String(error).includes('401')) {
        handleLogout();
      } else {
        alert('Erro ao salvar a Postagem');
      }
    } finally {
      setIsLoading(false);
      retornar();
    }
  };

  const carregandoTema = tema.descricao === '';

  /* ================= JSX ================= */

  return (
    <div className="container flex flex-col mx-auto items-center">
      <h1 className="text-4xl text-center my-8">
        {id !== undefined ? 'Editar Postagem' : 'Cadastrar Postagem'}
      </h1>

      <form
        onSubmit={gerarNovaPostagem}
        className="flex flex-col w-1/2 gap-4"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Título Postagem</label>
          <input
            type="text"
            name="titulo"
            value={postagem.titulo ?? ''}
            onChange={atualizarEstado}
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="texto">Texto Postagem</label>
          <textarea
            name="texto"
            value={postagem.texto ?? ''}
            onChange={atualizarEstado}
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="tema">Tema da Postagem</label>
          <select
            id="tema"
            className="border p-2 border-slate-800 rounded"
            onChange={(e) => buscarTemaPorId(e.currentTarget.value)}
          >
            <option value="">Selecione um Tema</option>
            {temas.map((t) => (
              <option key={t.id} value={t.id}>
                {t.descricao}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={carregandoTema || isLoading}
          className="rounded bg-indigo-400 hover:bg-indigo-800
                     disabled:bg-slate-200 text-white font-bold
                     w-1/2 mx-auto py-2 flex justify-center"
        >
          {isLoading ? (
            <SyncLoader color="#ffffff" size={8} />
          ) : id !== undefined ? (
            'Atualizar'
          ) : (
            'Cadastrar'
          )}
        </button>
      </form>
    </div>
  );
}

export default FormPostagem;
