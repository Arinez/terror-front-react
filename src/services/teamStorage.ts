import {Dispatch} from "react";
import {TeamType} from "./getTeamTokenMock.ts";

export type TeamStorage = {
    load: (setTeam: Dispatch<TeamType>) => () => void,
    store: (team: TeamType | undefined) => () => void,
    remove: () => void,
}

const KEY = "team";
export const TeamStorage = () => {
    const load = (setTeam: Dispatch<TeamType>) => {
        return () => {
            const team = localStorage.getItem(KEY);
            if (team !== null && team !== "undefined") {
                setTeam(JSON.parse(team))
            }
        }
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