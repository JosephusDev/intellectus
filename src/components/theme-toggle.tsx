import React from 'react'
import { useTheme } from '@/context/theme-context'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const ThemeToggle: React.FC = () => {
  const { toggleTheme } = useTheme()

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button variant='ghost' size='icon' onClick={toggleTheme}>
            <Sun className='hidden h-[1.5rem] w-[1.3rem] dark:block' />
            <Moon className='h-5 w-5 dark:hidden' />
            <span className='sr-only'>Toggle theme</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Alternar tema</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default ThemeToggle
