import ComboBox from '@/components/combobox'
import Header from '@/components/header'
import MyModal from '@/components/myModal'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useToast } from '@/hooks/use-toast'
import { Api } from '@/services/api'
import {
  Check,
  Circle,
  FileText,
  MoreHorizontal,
  PlusCircle,
  Send,
  Trash,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'

interface DataCombobox {
  id: string
  nome: string
}

interface ITrabalho {
  id: number
  titulo: string
  autores: string
  resumo: string
  palavras_chaves: string
  data_publicacao: string
  documento_url: string
  unidade: string
  cadastrado_por: string
  categoria: string
  tipo: string
  status: string
}

export default function Submissoes() {
  const nivel = localStorage.getItem('tipo')
  const usuario = localStorage.getItem('usuario')

  const { toast } = useToast()
  const alerta = (text: string) => {
    toast({
      description: (
        <div className='flex'>
          <div className='ml-2 font-bold'>{text}</div>
        </div>
      ),
    })
  }

  const [tipos, setTipos] = useState<DataCombobox[]>([])
  const [categorias, setCategorias] = useState<DataCombobox[]>([])
  const [unidades, setUnidades] = useState<DataCombobox[]>([])
  const [trabalhos, setTrabalhos] = useState<ITrabalho[]>([])

  const [titulo, setTitulo] = useState('')
  const [autores, setAutores] = useState('')
  const [resumo, setResumo] = useState('')
  const [palavras_chaves, setPalavras_chaves] = useState('')
  const [documento_url, setDocumento_url] = useState('')
  const [id_tipo, setIdTipo] = useState(0)
  const [id_categoria, setIdCategoria] = useState(0)
  const [id_unidade, setIdUnidade] = useState(0)

  const carregarTrabalhos = async () => {
    await Api.get<ITrabalho[]>('/trabalho')
      .then((response) => {
        if (nivel === 'Admin') {
          setTrabalhos(response.data)
        } else if (nivel === 'User') {
          const filter = response.data.filter(
            (trabalho) => trabalho.cadastrado_por === usuario,
          )
          setTrabalhos(filter)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const carregarTipos = async () => {
    await Api.get('/tipo')
      .then((response) => setTipos(response.data))
      .catch((error) => {
        console.log(error)
      })
  }
  const carregarCategorias = async () => {
    await Api.get('/categoria')
      .then((response) => setCategorias(response.data))
      .catch((error) => {
        console.log(error)
      })
  }

  const carregarUnidades = async () => {
    await Api.get('/unidade')
      .then((response) => setUnidades(response.data))
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    carregarUnidades()
    carregarCategorias()
    carregarTipos()
    carregarTrabalhos()
  }, [])

  const cadastrar = async () => {
    if (
      !titulo ||
      !autores ||
      !resumo ||
      !palavras_chaves ||
      !documento_url ||
      !id_unidade ||
      !id_categoria ||
      !id_tipo
    ) {
      alerta('Preencha todos os campos.')
      return
    }
    await Api.post('/trabalho', {
      titulo,
      autores,
      resumo,
      palavras_chaves,
      documento_url,
      id_unidade,
      usuario,
      id_categoria,
      id_tipo,
    })
      .then(() => {
        alerta('Adicionado com sucesso')
        carregarTrabalhos()
      })
      .catch((error) => {
        console.log('Erro ao adicionar: ' + error)
        alerta('Erro ao adicionar trabalho')
      })
  }

  const eliminar = async (id: number) => {
    await Api.delete('/trabalho/' + id)
      .then(() => {
        alerta('Eliminado com sucesso')
        carregarTrabalhos()
      })
      .catch(() => alerta('Erro ao eliminar'))
  }

  const alterarStatus = async (id: number, status: string) => {
    let _status
    if(status === "aprovado") {
      _status = "pendente"
    }else{
      _status = "aprovado"
    }
    await Api.put('/trabalho/' + id, {
      status: _status
    })
    .then(() => {
      alerta('Status alterado com sucesso')
      carregarTrabalhos()
    })
    .catch(() => alerta('Erro ao eliminar'))
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

  return (
    <>
      <Header />
      <div className='h-screen flex w-full'>
        <Card className='w-full h-full pt-16 px-10'>
          <CardHeader className='flex flex-row justify-between items-center'>
            <div>
              <CardTitle className='flex gap-2'>
                <Send /> <span className='font-bold text-xl'>Submissões</span>
              </CardTitle>
              <CardDescription className='hidden sm:flex'>
                Gerencie seus trabalhos e partilhe na plataforma.
              </CardDescription>
            </div>
            <div>
              <MyModal
                titulo_modal='Adicionar'
                onClick={cadastrar}
                triggers={
                  <Button className='gap-1'>
                    <PlusCircle size={15} /> Adicionar
                  </Button>
                }
              >
                <div className='space-y-4'>
                  <div className='grid grid-cols-4 items-center text-right gap-2'>
                    <Input
                      className='col-span-4'
                      placeholder='Título'
                      onChange={(v) => setTitulo(v.target.value)}
                    />
                    <Input
                      className='col-span-4'
                      placeholder='Autores'
                      onChange={(v) => setAutores(v.target.value)}
                    />
                    <Input
                      className='col-span-4'
                      placeholder='Resumo'
                      onChange={(v) => setResumo(v.target.value)}
                    />
                    <Input
                      className='col-span-4'
                      placeholder='Palavras chaves'
                      onChange={(v) => setPalavras_chaves(v.target.value)}
                    />
                    <Input
                      className='col-span-4'
                      placeholder='URL'
                      onChange={(v) => setDocumento_url(v.target.value)}
                    />
                    <ComboBox
                      placeholder='Unidade Orgânica'
                      items={unidades}
                      onChange={(v) => setIdUnidade(Number(v))}
                    />
                    <ComboBox
                      placeholder='Categoria'
                      items={categorias}
                      onChange={(v) => setIdCategoria(Number(v))}
                    />
                    <ComboBox
                      placeholder='Tipo'
                      items={tipos}
                      onChange={(v) => setIdTipo(Number(v))}
                    />
                  </div>
                </div>
              </MyModal>
            </div>
          </CardHeader>
          <CardContent className='border rounded-lg p-1'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='font-bold'>#</TableHead>
                  <TableHead className='font-bold'>Título</TableHead>
                  <TableHead className='font-bold'>Autores</TableHead>
                  <TableHead className='font-bold'>Resumo</TableHead>
                  <TableHead className='font-bold'>Palavras Chave</TableHead>
                  <TableHead className='font-bold whitespace-nowrap'>
                    Publicado aos
                  </TableHead>
                  <TableHead className='font-bold'>URL</TableHead>
                  <TableHead className='font-bold'>Unidade</TableHead>
                  <TableHead className='font-bold'>Área</TableHead>
                  <TableHead className='font-bold'>Tipo</TableHead>
                  <TableHead className='font-bold'>Status</TableHead>
                  <TableHead className='font-bold'>
                    <span className='sr-only'>Ações</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trabalhos.map((trabalho, index) => {
                  return (
                    <TableRow key={trabalho.titulo}>
                      <TableCell className='font-medium'>{index + 1}</TableCell>
                      <TableCell className='font-medium'>
                        {trabalho.titulo}
                      </TableCell>
                      <TableCell>{trabalho.autores}</TableCell>
                      <TableCell>{trabalho.resumo}</TableCell>
                      <TableCell>{trabalho.palavras_chaves}</TableCell>
                      <TableCell>
                        {formatarDataISO(trabalho.data_publicacao)}
                      </TableCell>
                      <TableCell>
                        <a
                          href={trabalho.documento_url}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <FileText />
                        </a>
                      </TableCell>
                      <TableCell>{trabalho.unidade}</TableCell>
                      <TableCell>{trabalho.categoria}</TableCell>
                      <TableCell>{trabalho.tipo}</TableCell>
                      <TableCell>
                        {trabalho.status === 'pendente' ? (
                          <Circle size={15} stroke='red' fill='red' />
                        ) : (
                          <Circle size={15} stroke='green' fill='green' />
                        )}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup='true'
                              size='icon'
                              variant='ghost'
                            >
                              <MoreHorizontal className='h-4 w-4' />
                              <span className='sr-only'>Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align='end'>
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuItem
                              className='gap-2'
                              onClick={() => eliminar(trabalho.id)}
                            >
                              <Trash size={15} /> Eliminar
                            </DropdownMenuItem>
                            {nivel === 'Admin' && (
                              <DropdownMenuItem
                                className={trabalho.status === 'aprovado' ? 'gap-2 text-red-500' : 'gap-2 text-green-500'}
                                onClick={() => alterarStatus(trabalho.id, trabalho.status)}
                              >
                                {trabalho.status === 'aprovado' ? (
                                  <>
                                    <X size={15} /> Despublicar
                                  </>
                                ) : (
                                  <>
                                    <Check size={15} /> Publicar
                                  </>
                                )}
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
