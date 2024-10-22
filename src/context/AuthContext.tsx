import React, { createContext, useContext, useEffect, useState } from 'react'
import { Api } from '@/services/api'
import { useToast } from '@/hooks/use-toast'
import { AlertTriangleIcon, CheckCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface AuthContextType {
  isAuthenticated: boolean
  setIsAuthenticated: (value: boolean) => void
  usuario: string
  tipo: string
  login: (email: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [usuario, setUsuario] = useState('')
  const [tipo, setTipo] = useState('')

  // Verificar o token no localStorage ao carregar a página
  useEffect(() => {
    const token = localStorage.getItem('token')
    const id = localStorage.getItem('id')
    const usuario = localStorage.getItem('usuario')
    const tipo = localStorage.getItem('tipo')
    if (token && id && usuario && tipo) {
      setIsAuthenticated(true)
      setUsuario(usuario)
      setTipo(tipo)
    }
  }, [])

  const { toast } = useToast()

  const navigate = useNavigate()

  const login = async (email: string) => {
    try {
      await Api.post('/send-magic-link', { email: email })
        .then(() => {
          toast({
            description: (
              <div className='flex'>
                <CheckCircle size='20' />
                <div className='ml-2 font-bold'>
                  Magic Link enviado para seu e-mail!
                </div>
              </div>
            ),
            variant: 'destructive',
          })
        })
        .catch((err) => {
          console.error('Error:', err.response.data)
        })
    } catch (error) {
      console.error('Login failed', error)
      toast({
        description: (
          <div className='flex'>
            <AlertTriangleIcon size='20' />
            <div className='ml-2 font-bold'>Email não encontrado.</div>
          </div>
        ),
        variant: 'destructive',
      })
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUsuario('')
    setTipo('')
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    localStorage.removeItem('usuario')
    localStorage.removeItem('tipo')
    navigate('/sign-in')
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        usuario,
        tipo,
        login,
        logout,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
