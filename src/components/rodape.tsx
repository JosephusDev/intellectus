import { MailIcon, Phone, Youtube } from 'lucide-react'

export default function Rodape() {
  return (
    <footer id='contactos' className='bg-primary-foreground w-full py-6 mt-10'>
      <div className='container mx-auto flex flex-col items-center justify-between md:flex-row'>
        {/* Text Section */}
        <p className='text-sm text-center md:text-left'>
          © {new Date().getFullYear()} Intellectus. Todos os direitos
          reservados.
        </p>
        {/* Icons Section */}
        <div className='flex mt-4 space-x-4 md:mt-0'>
          <a
            href='https://www.youtube.com'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-red-500'
          >
            <Youtube className='w-6 h-6' />
          </a>
          <a
            href='https://wa.me/+244934541438'
            className='hover:text-green-500'
          >
            <Phone className='w-6 h-6' />
          </a>
          <a
            href='mailto:condepinto2@gmail.com'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-blue-500'
          >
            <MailIcon className='w-6 h-6' />
          </a>
        </div>
      </div>
    </footer>
  )
}
