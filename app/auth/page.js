import Auth from '@/components/Auth/Auth';

export default async function AuthPage({ searchParams }) {
  const sp = await searchParams;
  const mode = sp?.mode === 'signin' ? 'signin' : 'signup';

  return <Auth mode={mode} />;
}
