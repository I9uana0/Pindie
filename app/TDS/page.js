'use client'

import { endpoints } from "../api/config";
import { CardsListSection } from "../components/CardsListSection/CardsListSection";
import { useGetDataByCategory } from "../api/api-hoocks";
import { Preloader } from "../components/Preloader/Preloader";


export default function TDS() {
    const TDSGames = useGetDataByCategory(endpoints.games, 'TDS');
    return (
        <main className="main-inner">
            {TDSGames ? (
                <CardsListSection id='TDS' title='TDS' data={TDSGames} />
            ) : (
                <Preloader />
            )}
        </main>
    )
} 