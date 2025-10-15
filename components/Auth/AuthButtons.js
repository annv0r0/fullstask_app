'use client';

import { logout } from '@/actions/auth';
import s from './AuthButtons.module.scss';
import { useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

export default function AuthButtons({ authStatus }) {
  const [activeBtn, setActiveBtn] = useState('signup');

  if (!authStatus)
    return (
      <div className={s.authButtons}>
        <Link
          className={clsx(s.authButtons__btn, activeBtn === 'signin' ? s.active : '')}
          href="/auth?mode=signin"
          onClick={() => setActiveBtn('signin')}
          type="button"
        >
          Sign in
        </Link>
        <Link
          className={clsx(s.authButtons__btn, activeBtn === 'signup' ? s.active : '')}
          href="/auth?mode=signup"
          onClick={() => setActiveBtn('signup')}
          type="button"
        >
          Sign up
        </Link>
      </div>
    );
  if (authStatus)
    return (
      <form action="/api/auth/logout">
        <button className={s.authButtons__btn} type="submit">
          Logout
        </button>
      </form>
    );
}
