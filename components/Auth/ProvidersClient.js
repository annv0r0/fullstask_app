'use client';
import { signIn } from 'next-auth/react';
import s from './styles.module.scss';

export default function ProvidersClient({ providers, callbackUrl = '/' }) {
  if (!providers) return null;

  return (
    <>
      {Object.values(providers).map((p) => (
        <button className={s.providers__btn} key={p.id} onClick={() => signIn(p.id, { callbackUrl })}>
          Sign in with {p.name}
        </button>
      ))}
    </>
  );
}
