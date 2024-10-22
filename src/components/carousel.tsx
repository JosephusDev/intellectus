import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import imageA from '@/assets/img/a.png'
import imageB from '@/assets/img/b.png'
import imageC from '@/assets/img/c.png'

export default function CarouselComponent() {
  return (
    <div className='bg-primary-foreground w-full h-1/2 sm:h-4/5 items-center justify-center px-4 sm:px-16 pt-10'>
      <Carousel className='w-full' opts={{ loop: true }}>
        <CarouselContent>
          <CarouselItem>
            <div className='flex flex-col items-center p-8'>
              <img
                src={imageA}
                alt='Trabalhos Acadêmicos'
                className='w-40 h-40 sm:w-80 sm:h-80 object-contain'
              />
              <span className='sm:text-xl text-lg text-center my-4'>
                Acesse trabalhos e artigos produzidos por estudantes e
                professores da universidade.
              </span>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className='flex flex-col items-center p-8'>
              <img
                src={imageB}
                alt='Artigos Científicos'
                className='w-40 h-40 sm:w-80 sm:h-80 object-contain'
              />
              <span className='sm:text-xl text-lg text-center my-4'>
                Explore pesquisas e publicações em diversas áreas do
                conhecimento.
              </span>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className='flex flex-col items-center p-8'>
              <img
                src={imageC}
                alt='Conteúdos Educacionais'
                className='w-40 h-40 sm:w-80 sm:h-80 object-contain'
              />
              <span className='sm:text-xl text-lg text-center my-4'>
                Tenha acesso a materiais e recursos educacionais para apoiar
                seus estudos.
              </span>
            </div>
          </CarouselItem>
        </CarouselContent>
        <div className='hidden sm:flex'>
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  )
}
