import { data } from "./Data";

export const getGamesByCategory = (category) => (
    data.filter((game) => {
        return (
            game.category.find((item => {
                return (item.name === category)
            }))
        )
    })
)


export const getGameById = (id) => (
    data.find((game) => game.id == id)
)