'use client'

import { endpoints } from "../api/config";
import { CardsListSection } from "../components/CardsList/CardsListSection";
import { useGetDataByCategory } from "../api/api-hoocks";
import { Preloader } from "../components/Preloader/Preloader";

export default function New() {
    const newGames = useGetDataByCategory(endpoints.games, "new");
    return (
        <main className="main-inner">
            {newGames ? (
                <CardsListSection id="new" title="Новые" data={newGames} />
            ) : (
                <Preloader />
            )}
        </main>
    );
}