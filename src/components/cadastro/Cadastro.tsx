import { useState, useEffect, useCallback } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import type Usuario from '../../models/Usuario'
import { cadastroUsuario } from '../../services/Service'

function Cadastro() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [confirmarSenha, setConfirmarSenha] = useState<string>("")

    const [usuario, setUsuario] = useState<Usuario>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: ''
    })

    // Função para voltar ao login após cadastro
    const retornar = useCallback(() => {
        navigate('/login')
    }, [navigate])

    useEffect(() => {
        if (usuario.id !== 0) {
            retornar()
        }
    }, [usuario, retornar])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value)
    }

    async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {
            setIsLoading(true)

            try {
                await cadastroUsuario(`/api/usuarios/cadastrar`, usuario, setUsuario)
                alert('Usuário cadastrado com sucesso!')
            } catch (error) {
                console.error(error)
                alert('Erro ao cadastrar o usuário!')
            } finally {
                setIsLoading(false)
            }
        } else {
            alert('Senhas não conferem ou senha muito curta!')
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
            <div className="bg-[url('https://i.imgur.com/ZZFAmzo.jpg')] lg:block hidden bg-no-repeat w-full min-h-screen bg-cover bg-center">
            </div>
            <form 
                onSubmit={cadastrarNovoUsuario}
                className='flex justify-center items-center flex-col w-2/3 gap-3'
            >
                <h2 className='text-slate-900 text-5xl'>Cadastrar</h2>
                
                <div className="flex flex-col w-full">
                    <label htmlFor="nome">Nome</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        placeholder="Nome"
                        value={usuario.nome}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        className="border-2 border-slate-700 rounded p-2"
                        required
                    />
                </div>

                <div className="flex flex-col w-full">
                    <label htmlFor="usuario">Usuario</label>
                    <input
                        type="text"
                        id="usuario"
                        name="usuario"
                        placeholder="Usuario (ex: email@email.com)"
                        value={usuario.usuario}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        className="border-2 border-slate-700 rounded p-2"
                        required
                    />
                </div>

                <div className="flex flex-col w-full">
                    <label htmlFor="foto">Foto</label>
                    <input
                        type="text"
                        id="foto"
                        name="foto"
                        placeholder="URL da foto"
                        value={usuario.foto}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        className="border-2 border-slate-700 rounded p-2"
                    />
                </div>

                <div className="flex flex-col w-full">
                    <label htmlFor="senha">Senha</label>
                    <input
                        type="password"
                        id="senha"
                        name="senha"
                        placeholder="Mínimo 8 caracteres"
                        value={usuario.senha}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        className="border-2 border-slate-700 rounded p-2"
                        required
                    />
                </div>

                <div className="flex flex-col w-full">
                    <label htmlFor="confirmarSenha">Confirmar Senha</label>
                    <input
                        type="password"
                        id="confirmarSenha"
                        name="confirmarSenha"
                        placeholder="Repita a senha"
                        value={confirmarSenha}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
                        className="border-2 border-slate-700 rounded p-2"
                        required
                    />
                </div>

                <div className="flex justify-around w-full gap-8 mt-4">
                    <button
                        type='reset' // Alterado para button para não submeter o form
                        onClick={retornar}
                        className="rounded text-white bg-red-400 hover:bg-red-700 w-1/2 py-2"
                    >
                        Cancelar
                    </button>
                    <button
                        type='submit'
                        disabled={isLoading}
                        className='rounded text-white bg-indigo-400 hover:bg-indigo-900 w-1/2 py-2 flex justify-center items-center'
                    >
                        {isLoading ? 
                        <ClipLoader 
                        color="#ffffff" 
                        size={24} 
                        /> : 
                        <span>Cadastrar</span>
                        }
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Cadastro