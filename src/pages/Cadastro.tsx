import {
  AlertTriangleIcon,
  CheckCircle,
  Library,
  Loader2,
  Mail,
  User,
  UserPlus,
} from 'lucide-react'
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
import { useState } from 'react'
import imageA from '@/assets/img/a.png'
import imageB from '@/assets/img/b.png'
import imageC from '@/assets/img/c.png'
import InputIcon from '@/components/input-icon'
import { useToast } from '@/hooks/use-toast'
import { Api } from '@/services/api'
import { useNavigate } from 'react-router-dom'

export default function CadastroScreen() {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')

  const { toast } = useToast()
  const alerta = () => {
    toast({
      description: (
        <div className='flex'>
          <AlertTriangleIcon size='20' />
          <div className='ml-2 font-bold'>
            Por favor, introduza informações correctas.
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

  const Cadastro = async () => {
    if (user.trim() && email.trim() && validateEmail(email)) {
      setLoading(true)
      Api.post('/cadastro', {
        nome: user,
        email: email,
      })
        .then(() => {
          toast({
            description: (
              <div className='flex'>
                <CheckCircle size='20' />
                <div className='ml-2 font-bold'>
                  Conta criada com sucesso. Faça login.
                </div>
              </div>
            ),
            variant: 'destructive',
          })
          navigate('/sign-in')
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false))
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
            <CardTitle className='text-2xl font-bold tracking-tighter flex items-center justify-center'>
              <Library size={30} className='text-primary mr-2' /> Bem-vindo ao
              Intellectus
            </CardTitle>
            <CardDescription className='text-center'>
              Repositório Acadêmico e Universitário.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor='utilizador'>Utilizador</Label>
              <InputIcon
                icon={<User />}
                className='mt-1'
                id='utilizador'
                value={user}
                onChange={(e) => setUser(e.target.value)}
                placeholder='Nome de utilizador'
              />
            </div>
            <div className='mt-4'>
              <Label htmlFor='email'>Email</Label>
              <InputIcon
                className='mt-1'
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
              onClick={Cadastro}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={15} className='mr-1 h-4 w-4 animate-spin' />
                </>
              ) : (
                <>
                  <UserPlus className='mr-1' size={15} />{' '}
                  <span>Cadastrar-me</span>
                </>
              )}
            </Button>

            <a href='/sign-in'>
              <p className='text-foreground text-center text-sm underline'>
                Já tenho uma conta
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
