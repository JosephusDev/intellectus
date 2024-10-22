import { Input } from './ui/input'
import React from 'react'

interface InputIconProps extends React.ComponentProps<'input'> {
  icon: React.ReactNode // Icone opcional que pode ser passado via props
}

export default function InputIcon({
  icon,
  className,
  ...props
}: InputIconProps) {
  return (
    <div className='relative flex-1 md:grow-0'>
      {icon && (
        <div className='absolute left-3 top-1.5 text-muted-foreground'>
          {icon}
        </div>
      )}
      <Input
        className={`mt-3 text-center ${className}`}
        {...props} // Passa todas as props para o input
      />
    </div>
  )
}
