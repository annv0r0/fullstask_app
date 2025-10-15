import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import './globals.scss';
import s from './layout.module.scss';
import AuthButtons from '@/components/Auth/AuthButtons';
import { verifySessionCookie } from '@/lib/server/auth/verify_session_cookie.js';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Launch your shop',
  description: 'Study fullstack',
};

export default async function RootLayout({ children }) {
  const { authenticated } = await verifySessionCookie();
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <nav className={s.nav}>
          <Link href="/">Main</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/upload">Upload file</Link>
          <div className={s.auth}>
            <AuthButtons authStatus={authenticated}></AuthButtons>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
