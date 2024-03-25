export const normalizeDataObject = (obj) => {
    return {
        ...obj,
        category: obj.categories,
        users: obj.users_permissions_users,
    };
};

export const normalizeData = (data) => {
    return data.map((item) => {
        return normalizeDataObject(item)
    })
};

export const getData = async (url) => {
    try {
        const response = await fetch(`${url}`);
        if (response.status !== 200) {
            throw new Error("Ошибка получения данных");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
};

export const getNormalizedGamesDataByCategory = async (url, category) => {
    const data = await getData(`${url}?categories.name=${category}`);
    return isResponseOk(data) ? normalizeData(data) : data;
};

export const getNormalizedGameDataById = async (url, id) => {
    const data = await getData(`${url}/${id}`);
    return isResponseOk(data) ? normalizeDataObject(data) : data;
};

export const isResponseOk = (response) => {
    return !(response instanceof Error);
};

export const authorize = async (url, data) => {
    try {

        const response = await fetch(url, {
            method: "POST",

            headers: { "Content-Type": "application/json" },

            body: JSON.stringify(data),
        });

        if (response.status !== 200) {
            throw new Error('Ошибка авторизации')
        }

        const result = await response.json();

        return result;

    } catch (error) {
        return error;
    }
}

export const getMe = async (url, jwt) => {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: { Authorization: `Bearer ${jwt}` },
        });
        if (response.status !== 200) {
            throw new Error("Ошибка получения данных");
        }
        const result = await response.json();
        return result;
    } catch (error) {
        return error;
    }
};

export const setJWT = (jwt) => {
    localStorage.setItem("jwt", jwt);
};

export const getJWT = () => {
    return localStorage.getItem("jwt");
};

export const removeJWT = () => {
    localStorage.removeItem("jwt");
};

export const checkIfUserVoted = (game, userId) => {
    return game.users.find((user) => user.id === userId)
}

export const vote = async (url, jwt, usersArray) => {
    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({ 'users_permission_users': usersArray })
        });
        if (response.status !== 200) {
            throw new Error("Ошибка голосования");
        }
        const result = await response.json();
        return result;
    } catch (error) {
        return error;
    }
}

export const handleVote = async () => {
    const jwt = getJWT();
    let usersIdArray = game.users.length
        ? game.users.map((user) => user.id)
        : [];
    usersIdArray.push(currnetUser.id);

    const responce = await vote(
        `${endpoints.games}/${game.id}`,
        jwt,
        usersIdArray
    );

    if (isResponseOk(responce)) {
        setIsVoted(true);
        setGame(() => {
            return {
                ...game,
                users: [...game.users, currnetUser],
            }
        })
    }
}