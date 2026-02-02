import { useState, useContext, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import type Postagem from '../../../models/Postagem'
import { buscar, deletar } from '../../../services/Service'
import { ClipLoader } from 'react-spinners'
import { AxiosError } from 'axios'

function DeletarPostagem() {

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

  const { id } = useParams<{ id: string }>()

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  const buscarPorId = useCallback(
    async (postagemId: string) => {
      try {
        await buscar(`/postagens/${postagemId}`, setPostagem, {
          headers: {
            Authorization: token
          }
        })
      } catch (error: unknown) {
        if (
          error instanceof AxiosError &&
          error.response?.status === 401
        ) {
          handleLogout()
        }
      }
    },
    [token, handleLogout]
  )

  useEffect(() => {
    if (token === '') {
      alert('Você precisa estar logado')
      navigate('/')
    }
  }, [token, navigate])

  useEffect(() => {
    if (id) {
      buscarPorId(id)
    }
  }, [id, buscarPorId])

  async function deletarPostagem() {
    if (!id) return

    setIsLoading(true)

    try {
      await deletar(`/postagens/${id}`, {
        headers: {
          Authorization: token
        }
      })

      alert('Postagem apagada com sucesso')
      retornar()

    } catch (error: unknown) {
      if (
        error instanceof AxiosError &&
        error.response?.status === 401
      ) {
        handleLogout()
      } else {
        alert('Erro ao deletar a postagem.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  function retornar() {
    navigate('/postagens')
  }

  return (
    <div className="container w-1/3 mx-auto">

      <h1 className="text-4xl text-center my-4">
        Deletar Postagem
      </h1>

      <p className="text-center font-semibold mb-4">
        Você tem certeza de que deseja apagar a postagem a seguir?
      </p>

      <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">

        <header className="py-2 px-6 bg-indigo-600 text-white font-bold text-2xl">
          Postagem
        </header>

        <div className="p-4">
          <p className="text-xl h-full">{postagem.titulo}</p>
          <p>{postagem.texto}</p>
        </div>

        <div className="flex">
          <button
            type="button"
            className="text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2"
            onClick={retornar}
          >
            Não
          </button>

          <button
            type="button"
            className="w-full text-slate-100 bg-indigo-400
                       hover:bg-indigo-600 flex items-center justify-center"
            onClick={deletarPostagem}
          >
            {isLoading ? (
              <ClipLoader color="#ffffff" size={24} />
            ) : (
              <span>Sim</span>
            )}
          </button>
        </div>

      </div>
    </div>
  )
}

export default DeletarPostagem
