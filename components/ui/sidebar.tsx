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

export function Sidebar() {
  const pathname = usePathname()
  const { t } = useTranslation()

  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-background border-r border-border">
      <div className="flex-1 flex flex-col pt-8 pb-4 overflow-y-auto">
        <div className="px-6 mb-8 flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary">SmartPriemkaPro</h1>
          <LanguageSwitcher />
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href)
            const Icon = item.icon
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {t(item.labelKey)}
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}