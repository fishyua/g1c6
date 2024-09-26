import { HomeIcon, StackIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { PropsWithChildren, ReactNode } from 'react'

export interface NavEntry {
  icon?: ReactNode
  content: string
  href: string
}

interface LayoutProps extends PropsWithChildren {
  navItems: NavEntry[]
}

export default function Layout(props: LayoutProps) {
  return (
    <div className="flex flex-col h-screen">
      <nav className="h-10 border-b flex flex-row text-sm leading-wtf">
        {props.navItems.map((val, i) => (
          <Link
            key={i}
            className="transition-spacing ease-quartic duration-300 flex items-center justify-center px-4 hover:px-6 border-r"
            href={val.href}
          >
            {val.icon && val.icon}
            {val.icon ? <span className="ml-1">{val.content}</span> : val.content}
          </Link>
        ))}
      </nav>
      <main className="flex-grow">{props.children}</main>
    </div>
  )
}
