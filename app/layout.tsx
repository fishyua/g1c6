import { cn } from '@/lib/utils'
import './globals.css'
import { Inter } from 'next/font/google'
import Layout from '@/components/layout'
import { CardStackIcon, HomeIcon } from '@radix-ui/react-icons'

export const metadata = {
  title: '高一6班の小站',
  description: '爱来自天津市嘉诚中学 2024 级。',
}

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hans">
      <body className={cn('font-sans antialiased', inter.variable)}>
        <Layout
          navItems={[
            {
              icon: <HomeIcon />,
              content: '高一6班',
              href: '/',
            },
            {
              icon: <CardStackIcon />,
              content: '教学资料',
              href: '/res',
            },
          ]}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
