import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// Interface para os itens da ComboBox
interface ComboBoxItem {
  id: string
  nome: string
}

interface ComboBoxProps {
  label?: string // Rótulo do grupo de itens
  items: ComboBoxItem[] // Array de objetos contendo nome e valor
  placeholder: string // Texto do placeholder
  onChange?: (value: string) => void // Callback quando um valor é selecionado
}

export default function ComboBox({
  label,
  items,
  placeholder,
  onChange,
}: ComboBoxProps) {
  return (
    <div className='col-span-4'>
      <Select onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {items.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.nome}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
