import Trabalhos from '@/components/trabalhos'
import Rodape from '@/components/rodape'
import Sobre from '@/components/sobre'
import CarouselComponent from '@/components/carousel'
import Header from '@/components/header'

export default function Home() {
  return (
    <>
      <Header />
      <main className='h-screen w-full justify-center'>
        <CarouselComponent />
        <Trabalhos />
        <Sobre />
        <Rodape />
      </main>
    </>
  )
}
