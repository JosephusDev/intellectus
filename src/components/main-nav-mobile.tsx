import { Button } from '@/components/ui/button'
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import { useAuth } from '@/context/AuthContext'
import { Archive, Info, Library, PhoneCall, Send } from 'lucide-react'

export function MainNavMobile() {
  const { isAuthenticated } = useAuth()
  return (
    <div className='flex flex-col'>
      <header className='sticky top-0 z-30 flex h-14 items-center px-2 bg-background gap-4'>
        <Sheet>
          <SheetTrigger>
            <Button size={'icon'} variant={'outline'}>
              <Library className='w-5 h-5 text-primary' />
            </Button>
          </SheetTrigger>
          <SheetContent side={'left'}>
            <nav className='grid gap-6 text-lg font-medium'>
              <a
                href='/'
                className='flex h-10 w-10 bg-primary 
                                rounded-full text-lg items-center justify-center text-primary-foreground md:text-base gap-2'
              >
                <Library className='h-5 w-5 transition-all' />
              </a>
              <a
                href='/#trabalhos'
                className='flex items-center gap-4 px-2.5 text-foreground
                                hover:text-muted-foreground'
              >
                <Archive className='h-5 w-5 transition-all' />
                <h6 className='text-base sm:text-xl'>Trabalhos</h6>
              </a>
              <a
                href='/#sobre'
                className='flex items-center gap-4 px-2.5 text-foreground
                                hover:text-muted-foreground'
              >
                <Info className='h-5 w-5 transition-all' />
                <h6 className='text-base sm:text-xl'>Sobre</h6>
              </a>
              <a
                href='/#contactos'
                className='flex items-center gap-4 px-2.5 text-foreground
                                hover:text-muted-foreground'
              >
                <PhoneCall className='h-5 w-5 transition-all' />
                <h6 className='text-base sm:text-xl'>Contacte-nos</h6>
              </a>
              {isAuthenticated && (
                <a
                  href='/submissoes'
                  className='flex items-center gap-4 px-2.5 text-foreground
                                    hover:text-muted-foreground'
                >
                  <Send className='h-5 w-5 transition-all' />
                  <h6 className='text-base sm:text-xl'>Submissões</h6>
                </a>
              )}
            </nav>
          </SheetContent>
        </Sheet>
        <h2>Menu</h2>
      </header>
    </div>
  )
}
