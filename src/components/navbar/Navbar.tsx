import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'

import { AuthContext } from '../../contexts/AuthContext'

function Navbar() {

    const navigate = useNavigate()
    const { usuario, handleLogout } = useContext(AuthContext)

    function logout() {
        handleLogout()
        navigate('/login')
    }

    return (
        <div className='w-full flex justify-center py-4 bg-indigo-900 text-white'>
            <div className="container flex justify-between text-lg mx-8">

                <Link to='/home' className="text-2xl font-bold">
                    Blog Pessoal
                </Link>

                {usuario.token !== '' && (
                    <div className='flex gap-4 items-center'>
                        <Link to='/postagens' className='hover:underline'>
                            Postagens
                        </Link>

                        <Link to='/temas' className='hover:underline'>
                            Temas
                        </Link>

                        <Link to='/cadastrarTema' className='hover:underline'>
                            Cadastrar tema
                        </Link>

                        <Link to='/perfil' className='hover:underline'>
                            Perfil
                        </Link>

                        <button
                            onClick={logout}
                            className='hover:underline cursor-pointer'
                        >
                            Sair
                        </button>
                    </div>
                )}

            </div>
        </div>
    )
}

export default Navbar
