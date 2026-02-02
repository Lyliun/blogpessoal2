import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { AuthContext } from '../../../contexts/AuthContext';
import { buscar, deletar } from '../../../services/Service';
import type Tema from '../../../models/Tema';

export default function DeletarTema() {
  const navigate = useNavigate();

  const [tema, setTema] = useState<Tema>({} as Tema);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(idTema: string) {
    try {
      await buscar(`/api/temas/${idTema}`, setTema, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes('401')) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      alert('Você precisa estar logado');
      navigate('/');
    }
  }, [token, navigate]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  async function deletarTema() {
    setIsLoading(true);

    try {
      await deletar(`/api/temas/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      alert('Tema deletado com sucesso');
      navigate('/temas');
    } catch (error) {
      if (error instanceof Error && error.message.includes('401')) {
        handleLogout();
      } else {
        alert('Erro ao deletar tema');
      }
    } finally {
      setIsLoading(false);
    }
  }

  function retornar() {
    navigate('/temas');
  }

  return (
    <div className="container w-1/3 mx-auto">
      <h1 className="text-4xl text-center my-4">Deletar tema</h1>

      <p className="text-center font-semibold mb-4">
        Você tem certeza que deseja apagar o tema a seguir?
      </p>

      <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
        <header className="py-2 px-6 bg-indigo-600 text-white font-bold text-2xl">
          Tema
        </header>

        <p className="p-8 text-3xl bg-slate-200 h-full">
          {tema.descricao}
        </p>

        <div className="flex">
          <button
            type="button"
            className="text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2"
            onClick={retornar}
            disabled={isLoading}
          >
            Não
          </button>

          <button
            type="button"
            className="text-slate-100 bg-green-400 hover:bg-green-600 w-full py-2"
            onClick={deletarTema}
            disabled={isLoading}
          >
            { isLoading ? <ClipLoader size={20} color="#fff" /> :
             <span>"Sim" </span> }
          </button>
        </div>
      </div>
    </div>
  );
}
