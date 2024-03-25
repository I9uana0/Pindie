import { getNormalizedGamesDataByCategory, normalizeData, normalizeDataObject } from "../api/api-utils";
import { endpoints } from "../api/config";
import { CardsList } from "../components/CardsList/CardsList";

export default async function New() {
    const runnerGames = await getNormalizedGamesDataByCategory(
        endpoints.games,
        'runner'
    )
    return (
        <main className="main-inner">
            <CardsList id='runner' title='Ранеры' data={runnerGames} />
        </main>
    )
} 