'use client'

import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
//import AuthButton from '@/components/authButton'

export default function Navigation() {
  return (
    <div style={{backgroundColor: 'white'}}>
      <NavigationMenu orientation="vertical">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()} style={{fontSize: '12px'}}>
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/dashboard" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()} style={{fontSize: '12px'}}>
                Dashboard
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
       </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}