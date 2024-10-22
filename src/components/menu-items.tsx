import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { useAuth } from '@/context/AuthContext'

export function MenuItems() {
  const { isAuthenticated } = useAuth()
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <a href='/#trabalhos'>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Trabalhos
            </NavigationMenuLink>
          </a>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <a href='/#sobre'>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Sobre
            </NavigationMenuLink>
          </a>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <a href='/#contactos'>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Contacte-nos
            </NavigationMenuLink>
          </a>
        </NavigationMenuItem>
        {isAuthenticated && (
          <NavigationMenuItem>
            <a href='/submissoes'>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Submissões
              </NavigationMenuLink>
            </a>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
