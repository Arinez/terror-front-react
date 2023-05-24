import {Team} from "../types/Team.ts";

export type TeamStorage = {
    load: () => Team | undefined,
    store: (team: Team | undefined) => () => void,
    remove: () => void,
}

const KEY = "team";
export const TeamStorage = () => {
    const load = () => {
        const team = localStorage.getItem(KEY);
        if (team !== null && team !== "undefined") {
            return JSON.parse(team) as Team
        }
        return undefined
    };

    const store = (team: Team | undefined) => {
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