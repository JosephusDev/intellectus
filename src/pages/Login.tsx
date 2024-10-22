import { AlertTriangleIcon, Library, Loader2, Mail, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { useAuth } from '@/context/AuthContext'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import imageA from '@/assets/img/a.png'
import imageB from '@/assets/img/b.png'
import imageC from '@/assets/img/c.png'
import InputIcon from '@/components/input-icon'

export default function LoginScreen() {
  const [loading, setLoading] = useState(false)

  const { toast } = useToast()
  const alerta = () => {
    toast({
      description: (
        <div className='flex'>
          <AlertTriangleIcon size='20' />
          <div className='ml-2 font-bold'>
            Por favor, introduza um e-mail válido.
          </div>
        </div>
      ),
      variant: 'destructive',
    })
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const logar = async () => {
    if (email.trim() && validateEmail(email)) {
      setLoading(true)
      await login(email)
      setEmail('')
      setLoading(false)
    } else {
      alerta()
    }
  }

  return (
    <main className='h-screen flex w-full'>
      <div className='sm:flex hidden bg-primary-foreground w-full h-full items-center justify-center p-16'>
        <Carousel className='w-full max-w-xl' opts={{ loop: true }}>
          <CarouselContent>
            <CarouselItem>
              <div className='flex aspect-square bg-background rounded p-8'>
                <img src={imageA} alt='' />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className='flex aspect-square bg-background rounded p-8'>
                <img src={imageB} alt='' />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className='flex aspect-square bg-background rounded p-8'>
                <img src={imageC} alt='' />
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <section className='flex bg-background h-full w-max-3xl w-full p-4 items-center justify-center'>
        <Card className='w-full max-w-md'>
          <CardHeader>
            <CardTitle className='text-xl font-bold tracking-tighter flex items-center justify-center'>
              <Library size={30} className='text-primary mr-2' /> Bem-vindo ao
              Intellectus
            </CardTitle>
            <CardDescription className='text-center'>
              Repositório Acadêmico e Universitário.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor='email'>Email</Label>
              <InputIcon
                icon={<Mail />}
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type='email'
                placeholder='Introduza seu e-mail'
              />
            </div>
            <Button
              variant={'outline'}
              className='mt-6 mb-6 w-full'
              onClick={logar}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={15} className='mr-1 h-4 w-4 animate-spin' />
                </>
              ) : (
                <>
                  <Send className='mr-1' size={15} /> <span>Enviar</span>
                </>
              )}
            </Button>
            <a href='/sign-up'>
              <p className='text-foreground text-center text-sm underline'>
                Não tenho uma conta
              </p>
            </a>
          </CardContent>
          <CardFooter>
            <p className='text-muted-foreground text-center text-sm'>
              Ao entrar na plataforma concorda com os Termos de Uso e Políticas
              de privacidade.
            </p>
          </CardFooter>
        </Card>
      </section>
    </main>
  )
}
