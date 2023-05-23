import {TeamType} from "./getTeamTokenMock.ts";

export type TeamStorage = {
    load: () => TeamType | undefined,
    store: (team: TeamType | undefined) => () => void,
    remove: () => void,
}

const KEY = "team";
export const TeamStorage = () => {
    const load = () => {
        const team = localStorage.getItem(KEY);
        if (team !== null && team !== "undefined") {
            return JSON.parse(team) as TeamType
        }
        return undefined
    };

    const store = (team: TeamType | undefined) => {
        return () => {
            if (team !== undefined) {
                window.localStorage.setItem(KEY, JSON.stringify(team))
            }
        }
    };

    const remove = () => {
        window.localStorage.removeItem(KEY)
    }

    return {
        load,
        store,
        remove,
    } as TeamStorage;
}