import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'

interface CardProps {
  title: string
  icon: React.ReactNode
  description: string
  content: string
}

export default function CardContentSobre({
  title,
  icon,
  description,
  content,
}: CardProps) {
  return (
    <Card className='bg-primary-foreground'>
      <CardHeader>
        <div className='flex items-center justify-center'>
          <CardTitle className='text-secondary-foreground sm:text-xl select-none'>
            {title}
          </CardTitle>
          <div className='ml-auto w-6 h-6 text-primary'>{icon}</div>
        </div>
      </CardHeader>
      <CardDescription className='text-secondary-foreground text-center py-3 px-1'>
        {description}
      </CardDescription>
      <CardContent>
        <p className='text-sm font-bold select-none'>{content}</p>
      </CardContent>
    </Card>
  )
}
