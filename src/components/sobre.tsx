import CardContentSobre from './card-content-sobre'
import { FileText, PenIcon, Tag } from 'lucide-react'

export default function Sobre() {
  return (
    <div className='sm:mx-14 p-4' id='sobre'>
      <h2 className='text-2xl text-center font-bold text-muted-foreground mb-4'>
        Sobre o Intellectus
      </h2>
      <p className='text-muted-foreground text-justify tracking-wider sm:w-[85%] sm:max-w-[100%] lg:max-w-[60%] mx-auto mt-5 mb-10'>
        O Intellectus é uma plataforma acadêmica inovadora que visa conectar
        estudantes, professores e pesquisadores, promovendo a partilha de
        conhecimentos e avanços científicos.
      </p>
      <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4'>
        <CardContentSobre
          title='Artigos publicados'
          icon={<FileText />}
          description='Artigos científicos de diversas áreas publicadas por professores e estudantes.'
          content='53 artigos'
        />
        <CardContentSobre
          title='Trabalhos acadêmicos'
          icon={<PenIcon />}
          description='Trabalhos acadêmicos elaborados por professores e estudantes.'
          content='120 trabalhos'
        />
        <CardContentSobre
          title='Áreas e categorias'
          icon={<Tag />}
          description='Destaque para áreas como "Engenharias", "Ciências da Saúde", "Ciências Sociais", etc.'
          content='5 áreas'
        />
      </div>
    </div>
  )
}
