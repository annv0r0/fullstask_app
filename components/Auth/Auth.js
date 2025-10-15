'use client';

import { useActionState } from 'react';
import s from './Auth.module.scss';
import { signin, signup } from '@/actions/auth';

export default function Auth({ mode }) {
  const [signinState, signinAction] = useActionState(signin, {});
  const [signupState, signupAction] = useActionState(signup, {});
  const currentAction = mode === 'signin' ? signinAction : signupAction;
  const currentState = mode === 'signin' ? signinState : signupState;

  return (
    <main className={s.main}>
      <section className={s.section}>
        <h1 className={s.header}>{mode === 'signin' ? 'Sign in' : 'Sign up'}</h1>
        <form className={s.form} action={currentAction}>
          <p className={s.form__email}>
            <label className={s.form__email_label} htmlFor="email">
              Email
            </label>
            <input className={s.form__email_input} id="email" name="email" type="email" autoComplete="email" required />
          </p>

          <p className={s.form__pswrd}>
            <label className={s.form__pswrd_label} htmlFor="password">
              Password
            </label>
            <input className={s.form__pswrd_input} id="password" name="password" type="password" />
          </p>
          {mode === 'signup' && (
            <p className={s.form__pswrdConfirm}>
              <label className={s.form__pswrdConfirm_label} htmlFor="confirm">
                Confirm password
              </label>

              <input className={s.form__pswrdConfirm_input} id="confirm" name="confirm" type="password" />
            </p>
          )}

          {currentState?.errors && (
            <ul className={s.form__error}>
              {Object.keys(currentState.errors).map((e) => (
                <li key={e}>{currentState.errors[e]}</li>
              ))}
            </ul>
          )}

          <button className={s.form__btn} type="submit">
            {mode === 'signin' ? 'Sign in' : 'Create account'}
          </button>
        </form>
      </section>
    </main>
  );
}
