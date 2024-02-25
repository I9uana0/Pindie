import { getGamesByCategory } from "./Data/Data-util";

import { Banner } from "@/app/components/Banner/Banner"
import { Promo } from "@/app/components/Promo/Promo"
import { CardsList } from "@/app/components/CardsList/CardsList"


export default function Home() {
  const popularGames = getGamesByCategory("popular");
  const newGames = getGamesByCategory("new");

  return (
    <main className="main">
      <Banner />
      <CardsList id="new" title="Новинки" data={newGames} />
      < CardsList id="popular" title="Популярное" data={popularGames} />
      <Promo />
    </main>
  );
}
