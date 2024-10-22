import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface MyModalProps {
  titulo_modal: string
  children?: React.ReactNode
  triggers?: React.ReactNode
  icone?: React.ReactNode
  exibirBotoes?: boolean
  desabilitado?: boolean
  onClick?: () => void
}

export default function MyModal({
  children,
  titulo_modal,
  triggers,
  exibirBotoes = true,
  desabilitado = false,
  icone,
  onClick,
}: MyModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{triggers}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{titulo_modal}</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>{children && children}</div>
        {exibirBotoes && (
          <DialogFooter className='gap-2'>
            <DialogClose asChild>
              <Button variant={'outline'}>Cancelar</Button>
            </DialogClose>
            <Button disabled={desabilitado} onClick={onClick}>
              {icone ? icone : 'Confirmar'}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
