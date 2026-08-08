import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sanity Studio - Quản trị',
  description: 'Trang quản trị nội dung website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  )
}
