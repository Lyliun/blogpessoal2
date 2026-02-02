import { createContext, type ReactNode, useState } from 'react'

import type UsuarioLogin from '../models/UsuarioLogin'
import { login } from '../services/Service'

interface AuthContextProps {
    usuario: UsuarioLogin
    handleLogout(): void
    handleLogin(usuarioLogin: UsuarioLogin): Promise<void>
    isLoading: boolean
}

interface AuthProviderProps {
    children: ReactNode
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {

    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: '',
        token: ''
    })

    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function handleLogin(usuarioLogin: UsuarioLogin): Promise<void> {
        setIsLoading(true)
        try {
            await login(`/api/usuarios/logar`, usuarioLogin, setUsuario)
            alert('O usuário foi logado com sucesso!')
        } catch {
            alert('Dados inválidos. Verifique o usuário e a senha.')
        } finally {
            setIsLoading(false)
        }
    }

    function handleLogout(): void {
        setUsuario({
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto: '',
            token: ''
        })
    }

    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}
