import { getNormalizedGamesDataByCategory, normalizeData, normalizeDataObject } from "../api/api-utils";
import { endpoints } from "../api/config";
import { CardsList } from "../components/CardsList/CardsList";

export default async function New() {
    const TDSGames = await getNormalizedGamesDataByCategory(
        endpoints.games,
        'TDS'
    )
    return (
        <main className="main-inner">
            <CardsList id='TDS' title='TDS' data={TDSGames} />
        </main>
    )
} 