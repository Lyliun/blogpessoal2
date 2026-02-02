import { Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { ClipLoader } from 'react-spinners'

import { AuthContext } from '../../contexts/AuthContext'
import type UsuarioLogin from '../../models/UsuarioLogin'

function Login() {

  const navigate = useNavigate()

  const { usuario, handleLogin, isLoading } = useContext(AuthContext)

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({
    usuario: '',
    senha: ''
  } as UsuarioLogin)

  useEffect(() => {
    if (usuario.token !== '') {
      navigate('/home')
    }
  }, [usuario, navigate])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value
    })
  }

  function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    handleLogin(usuarioLogin)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
      
      <form 
        onSubmit={login}
        className="flex justify-center items-center flex-col w-2/3 gap-3"
      >
        <h2 className="text-slate-900 text-5xl">Entrar</h2>

        <div className="flex flex-col w-full">
          <label htmlFor="usuario">Usuário</label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            placeholder="Usuário"
            value={usuarioLogin.usuario}
            onChange={atualizarEstado}
            className="border-2 border-slate-700 rounded p-2"
            required
            disabled={isLoading}
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            name="senha"
            placeholder="Senha"
            value={usuarioLogin.senha}
            onChange={atualizarEstado}
            className="border-2 border-slate-700 rounded p-2"
            required
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="rounded text-white bg-indigo-400 hover:bg-indigo-900 w-full py-2 mt-4 flex justify-center items-center"
        >
          {isLoading ? (
            <ClipLoader color="#ffffff" size={24} />
          ) : (
            <span>Entrar</span>
          )}
        </button>

        <hr className="border-slate-300 w-full" />

        <p>
          Ainda não tem uma conta?{' '}
          <Link 
            to="/cadastro" 
            className="text-indigo-800 hover:underline cursor-pointer"
          >
            Cadastre-se
          </Link>
        </p>
      </form>

      <div className="bg-[url('https://i.imgur.com/ZZFAmzo.jpg')] lg:block hidden bg-no-repeat w-full min-h-screen bg-cover bg-center"></div>
    </div>
  )
}

export default Login
