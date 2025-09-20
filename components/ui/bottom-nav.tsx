"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Building2, Camera, FileText, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '@/components/ui/language-switcher'

const navItems = [
  { href: "/dashboard", labelKey: "dashboard", icon: Home },
  { href: "/objects", labelKey: "objects", icon: Building2 },
  { href: "/gallery", labelKey: "gallery", icon: Camera },
  { href: "/report", labelKey: "reports", icon: FileText },
  { href: "/settings", labelKey: "settings", icon: Settings },
]

export function BottomNav() {
  const pathname = usePathname()
  const { t } = useTranslation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border lg:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          const Icon = item.icon
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center space-y-1 p-2 rounded-lg transition-colors",
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{t(item.labelKey)}</span>
            </Link>
          )
        })}
        <div className="flex flex-col items-center justify-center p-2">
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  )
}