import { MainNav } from '@/components/main-nav'
import { LeftNav } from '@/components/left-nav'
import { MainNavMobile } from '@/components/main-nav-mobile'

export default function Header() {
  return (
    <header className='fixed top-0 left-0 z-50 w-full border-b bg-background'>
      <div className='flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0'>
        <div className='hidden md:flex w-full'>
          <MainNav />
        </div>
        <div className='flex md:hidden w-full'>
          <MainNavMobile />
        </div>
        <LeftNav />
      </div>
    </header>
  )
}
