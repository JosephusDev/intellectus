import { Calendar, CalendarIcon, GraduationCap, Tags, Users } from 'lucide-react'
import SearchInput from './search-input'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { useEffect, useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar as Calendario } from '@/components/ui/calendar'
import { Api } from '@/services/api'
import { Button } from './ui/button'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
interface ITrabalho {
  titulo: string
  autores: string
  palavras_chaves: string
  data_publicacao: string
  documento_url: string
  categoria: string
  status: string
}

export default function Trabalhos() {
  
  const [trabalhos, setTrabalhos] = useState<ITrabalho[]>([])
  const [dataSearch, setDataSearch] = useState<Date | undefined>(new Date())
  const [search, setSearch] = useState("")
  const [isCalendarChanged, setIsCalendarChanged] = useState(false)

  const carregarTrabalhos = async () => {
    await Api.get<ITrabalho[]>('/trabalho')
      .then((response) => {
        const filter = response.data.filter(
          (trabalho) => trabalho.status === "aprovado",
        )
        setTrabalhos(filter)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  function formatarDataISO(dateString: string) {
    const date = new Date(dateString)

    if (isNaN(date.getTime())) {
      return undefined
    }

    const year = date.getUTCFullYear() // Obtém o ano no UTC
    const month = String(date.getUTCMonth() + 1).padStart(2, '0') // Obtém o mês no UTC (0-11, então soma 1)
    const day = String(date.getUTCDate()).padStart(2, '0') // Obtém o dia no UTC

    return `${day}/${month}/${year}`
  }

  useEffect(() =>{
    carregarTrabalhos()
  }, [])

  const trabalhos_filtrados = search ? trabalhos.filter((t) =>
    t.autores.toLowerCase().includes(search.toLowerCase())
    || t.categoria.toLowerCase().includes(search.toLowerCase())
    || t.palavras_chaves.toLowerCase().includes(search.toLowerCase())
    || t.titulo.toLowerCase().includes(search.toLowerCase())
  ) : (isCalendarChanged && dataSearch) ? trabalhos.filter((t) => format(t.data_publicacao, "dd/MM/yyyy").includes(format(dataSearch, "dd/MM/yyyy"))) : trabalhos

  console.log(dataSearch && format(dataSearch, "dd/MM/yyyy"))


  return (
    <div className='sm:mx-14 p-4' id='trabalhos'>
      <h2 className='text-2xl text-center font-bold text-muted-foreground mb-4'>
        Trabalhos e Artigos
      </h2>
      <p className='text-muted-foreground text-justify tracking-wider sm:w-[85%] sm:max-w-[100%] lg:max-w-[60%] mx-auto mt-5 mb-10'>
        Veja aqui trabalhos e artigos de diversas áreas de conhecimento
        publicadas por estudantes, professores e pesquisadores.
      </p>
      <Card>
        <CardHeader>
          <CardTitle>Trabalhos e artigos publicados</CardTitle>
          <SearchInput onChange={(e)=>{
            setSearch(e.target.value)
            setIsCalendarChanged(false)
          }} />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-full rounded-lg bg-background md:w-[200px] lg:w-[320px] mt-3 justify-start text-left font-normal',
                  !dataSearch && 'text-muted-foreground',
                )}
              >
                <CalendarIcon className='mr-2 h-4 w-4' />
                {dataSearch ? format(dataSearch, 'PPP') : <span>Escolha uma data</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendario
                mode='single'
                selected={dataSearch}
                onSelect={(date)=>{
                  setDataSearch(date)
                  setIsCalendarChanged(true)
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </CardHeader>
        <CardContent className='overflow-y-auto max-h-[400px] grid gap-8'>
          {
            trabalhos_filtrados.length === 0 && (
              <p className='text-center font-bold'>Nenhum trabalho ou artigo encontrado</p>
            )
          }
          {
            trabalhos_filtrados.map((trabalho)=>{
              return (
                <div key={trabalho.titulo} className='flex items-center gap-4'>
                  <div className='grid gap-1'>
                    <a href={trabalho.documento_url}  className='text-sm font-bold mb-2 hover:underline'>{trabalho.titulo}</a>
                    <p className='flex gap-1 text-sm mb-2'><Tags size={15} /> {trabalho.palavras_chaves}</p>
                    <p className='flex gap-1 text-sm text-muted-foreground'>
                      <Users size={15} /> {trabalho.autores}
                    </p>
                    <p className='flex gap-1 text-sm text-muted-foreground'>
                      <GraduationCap size={15} /> {trabalho.categoria}
                    </p>
                  </div>
                  <div className='flex ml-auto text-sm gap-1'>
                    <Calendar size={15} /> {formatarDataISO(trabalho.data_publicacao)}
                  </div>
                </div>
              )
            })
          }
        </CardContent>
      </Card>
    </div>
  )
}
