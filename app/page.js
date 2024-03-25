import { Banner } from "@/app/components/Banner/Banner"
import { Promo } from "@/app/components/Promo/Promo"
import { CardsList } from "@/app/components/CardsList/CardsList"
import { getData, normalizeData } from "./api/api-utils";
import { endpoints } from "./api/config";

export default async function Home() {

  const allGames = await getData(endpoints.games)

  const normalizedAllGames = normalizeData(allGames)

  return (
    <main className="main">
      <Banner />
      <CardsList category="AllGames" title="Все игры" data={normalizedAllGames} />
      <Promo />
    </main>
  );
}