import { Banner } from "@/app/components/Banner/Banner"
import { Promo } from "@/app/components/Promo/Promo"
import { CardsList } from "@/app/components/CardsList/CardsList"
import { getData } from "./api/api-utils";
import { endpoints } from "./api/config";

export default async function Home() {

  const allGames = await getData(endpoints.games)

  return (
    <main className="main">
      <Banner />
      <CardsList category="AllGames" title="Все игры" data={allGames} />
      <Promo />
    </main>
  );
}