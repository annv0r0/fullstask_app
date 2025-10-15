import Dashboard from '@/components/Dashboard/Dashboard';
import { redirect } from 'next/navigation';
import { verifySessionCookie } from '@/lib/server/auth/verify_session_cookie';

export default async function DashboardPage() {
  const { authenticated } = await verifySessionCookie();

  if (!authenticated) return redirect('/auth');
  return <Dashboard authenticated={authenticated} />;
}
