import {
  Routes,
  Route,
  Navigate,
  useParams,
  useNavigate,
} from 'react-router-dom'
import { useEffect } from 'react'
import Home from '@/pages/Home'
import LoginScreen from '@/pages/Login'
import CadastroScreen from '@/pages/Cadastro'
import Submissoes from '@/pages/Submissoes'
import { Api } from '@/services/api'
import { useAuth } from '@/context/AuthContext'

export default function RoutesComponent() {
  const token = localStorage.getItem('token')
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path='/sign-in' element={<LoginScreen />} />
      <Route path='/sign-up' element={<CadastroScreen />} />
      <Route path='/' element={<Home />} />

      {/* Rota para capturar o token e o usuário */}
      <Route path='/:token/:user' element={<TokenValidationRoute />} />

      {/* Rotas privadas */}

      <Route
        path='/submissoes'
        element={token ? <Submissoes /> : <Navigate to='/' />}
      />

      {/* Rota para lidar com páginas não encontradas */}
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  )
}

// Componente para validar o token diretamente nas rotas
function TokenValidationRoute() {
  const { token, user } = useParams() // Captura o token e o usuário da URL
  const navigate = useNavigate()
  const { setIsAuthenticated } = useAuth()

  useEffect(() => {
    const verificarToken = async () => {
      // Faz a requisição ao backend para verificar o token
      await Api.get(`/auth/${token}/${user}`)
        .then((response) => {
          console.log(response)
          if (token) {
            localStorage.setItem('token', token)
          }
          localStorage.setItem('id', response.data[0].id)
          localStorage.setItem('usuario', response.data[0].nome)
          localStorage.setItem('tipo', response.data[0].tipo)
          setIsAuthenticated(true)
        })
        .catch((error) => {
          console.error('Erro ao verificar o token:', error)
        })
        .finally(() => {
          navigate('/')
        })
    }

    verificarToken()
  }, [token, user])

  return <></>
}
