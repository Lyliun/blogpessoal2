import React from 'react';

import { Link } from 'react-router-dom';
function Login() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
        <form className="flex justify-center items-center flex-col w-2/3 gap-3">
          <h2 className="text-slate-900 text-5xl">Entrar</h2>
          <div className="flex flex-col w-full">
            <label htmlFor="usuario">Usuário</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuario"
              className="border-2 border-slate-700 rounded p-2"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="border-2 border-slate-700 rounded p-2"
            />
          </div>
          <button
            type="submit"
            className="rounded text-white bg-indigo-400 hover:bg-indigo-900 w-full py-2 mt-4 flex justify-center"
          >
            Entrar
          </button>

          <hr className="border-slate-300 w-full" />

          <p>
            Ainda não tem uma conta?{' '}
            <Link to="/cadastro" className="text-indigo-800 hover:underline cursor-pointer">
              Cadastre-se
            </Link>
          </p>
        </form>
        <div className="bg-[url('https://i.imgur.com/ZZFAmzo.jpg')] lg:block hidden bg-no-repeat w-full min-h-screen bg-cover bg-center"></div>
      </div>
    </>
  );
}

export default Login;