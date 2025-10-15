import s from './page.module.scss';
import Image from 'next/image';

export default async function Home() {
  // <SaveItem />
  // - upload csv (article/id, title, description, wight, price/kg, description, availible, raiting)
  // - upload image
  // - send (save to BD) btn

  // <ItemsList />
  // - list of items from BD
  // <AddToCart/> btn

  // <AddToCart /> btn
  // - db.take(article)
  // - add to cart (?)

  // <ShoppingCartPreview />
  // - list of picked items
  // -- amount of item
  // -- <ChangeAmount /> btns
  // -- <DeleteItem /> btn
  // - total ammount
  // - <GoToCart /> btn

  // <ShoppingCart /> the same as  <ShoppingCartPreview /> but:
  // - different design
  // - <ProceedToCheckout /> btn instead of <GoToCart /> btn

  return (
    <main className={s.main}>
      <h1 className={s.title}>SUPER-DUPER FULLSTACK-APP</h1>
      <div className={s.imageWrapper}>
        <Image className={s.hero} src="https://cdn.thesimpsonsapi.com/500/episode/1.webp" alt="hero" fill></Image>
      </div>
      <p className={s.blurb}>
        Track meals and spending in seconds. Upload receipts or CSVs, we parse them into items and expenses, store
        everything securely, and surface a clean dashboard with recent purchases, monthly budget, and a ready-to-use
        shopping list. Sign in with email or socials and start planning smarter.
      </p>
    </main>
  );
}
