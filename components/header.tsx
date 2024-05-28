'use client'

import * as React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client"
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
  const supabase = createClient();
  const router = useRouter();
  // logout handler
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push("/");
      router.refresh();
    } else {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <div className="bg-white flex flex-row gap-4">
      <NavigationMenu orientation="vertical" className="flex flex-row gap-4">
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
          <NavigationMenuItem onClick={handleLogout} style={{ cursor: 'pointer', fontSize: '12px' }}>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()} style={{fontSize: '12px'}}>
                Logout
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
       </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}