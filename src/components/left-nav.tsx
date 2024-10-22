import { LogOut, User } from 'lucide-react'
import ThemeToggle from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import { Avatar, AvatarFallback } from './ui/avatar'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'

export function LeftNav() {
  const { isAuthenticated, logout } = useAuth()
  const usuario = localStorage.getItem('usuario')
  return (
    <div className='flex flex-1 items-center justify-end space-x-4 px-5'>
      <nav className='flex items-center space-x-1'>
        {isAuthenticated ? (
          <>
            <Button variant={'ghost'} onClick={logout}>
              <LogOut className='h-4 w-4 mx-1' />
              <span>Sair</span>
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Avatar>
                    <AvatarFallback>
                      {usuario
                        ?.split(' ')
                        .map((p) => {
                          return p[0]
                        })
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{usuario}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        ) : (
          <a href='/sign-in'>
            <Button variant={'ghost'}>
              <User className='h-4 w-4 mx-1' />
              <span>Entrar</span>
            </Button>
          </a>
        )}
        <ThemeToggle />
      </nav>
    </div>
  )
}
