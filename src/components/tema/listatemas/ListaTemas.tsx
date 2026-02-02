import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';

import { AuthContext } from '../../../contexts/AuthContext';
import CardTema from '../../tema/cardtema/CardTema';
import { buscar } from '../../../services/Service';
import type Tema from '../../../models/Tema';



export default function ListaTemas() {

  const navigate = useNavigate();

  const { usuario } = useContext(AuthContext);



  const [temas, setTemas] = useState<Tema[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);



  const buscarTemas = useCallback(async () => {

    setIsLoading(true);



    try {

      await buscar('/api/temas', setTemas, {

        headers: {

          Authorization: usuario.token,

        },

      });

    } catch (error) {

      console.error(error);

      alert('Erro ao buscar temas');

    } finally {

      setIsLoading(false);

    }

  }, [usuario.token]);



  useEffect(() => {

    if (usuario.token === '') {

      alert('Você precisa estar logado');

      navigate('/login');

      return;

    }



    buscarTemas();

  }, [usuario.token, navigate, buscarTemas]);



  return (

    <div className="flex justify-center w-full my-8">

      <div className="container flex flex-col">

        <h1 className="text-4xl text-center my-8">Temas</h1>



        {isLoading ? (

          <div className="flex justify-center items-center h-40">

            <SyncLoader size={12} />

          </div>

        ) : temas.length === 0 ? (

          <p className="text-center text-xl text-slate-500">

            Nenhum tema foi encontrado.

          </p>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {temas.map((tema) => (

              <CardTema key={tema.id} tema={tema} />

            ))}

          </div>

        )}

      </div>

    </div>

  );

}