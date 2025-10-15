// SERVER

'use server';

export async function addToCart(formData) {
  // const id = formData.get('id');
  // 'use server';

  fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/items`);

  // fetch('/api/items', { method: 'POST', body: JSON.stringify(data) });
  return;
}

export async function removeFromCart(formData) {
  // 'use server';
  // const id = formData.get('id');

  fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/items`);
  // fetch('/api/items', { method: 'POST', body: JSON.stringify(data) });

  return;
}
// {body:})
