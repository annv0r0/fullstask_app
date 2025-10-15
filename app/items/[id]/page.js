import Item from '@/components/Items/Item';
import { getItemById } from '@/lib/server/db/items';
import { redirect } from 'next/navigation';
import { verifySessionCookie } from '@/lib/server/auth/verify_session_cookie';

export default async function ItemPage({ params }) {
  const { authenticated } = await verifySessionCookie();

  if (!authenticated) {
    return redirect('/auth');
  }

  const { id } = await params;
  const data = await getItemById(id);

  return <Item pageType="detail" {...data} />;
}
