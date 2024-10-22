import { Search } from 'lucide-react'
import { Input } from './ui/input'

interface InputIconProps extends React.ComponentProps<'input'> {}

export default function SearchInput({
  className,
  ...props
}: InputIconProps) {
  return (
    <div className='relative flex-1 md:grow-0'>
      <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground mt-3' />
      <Input
        type='search'
        placeholder='Pesquisar...'
        {...props}
        className='w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px] mt-3'
      />
    </div>
  )
}
