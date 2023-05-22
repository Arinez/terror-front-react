import {Dispatch} from "react";
import {TeamType} from "./getTeamTokenMock.tsx";

export type StorageType = {
    loadTeam: (setTeam: Dispatch<TeamType>) => () => void,
    storeTeam: (team: TeamType | undefined) => () => void,
    removeTeam: () => void,
}

const KEY = "team";
export const LocalStorage = () => {
    const loadTeam = (setTeam: Dispatch<TeamType>) => {
        return () => {
            const team = localStorage.getItem(KEY);
            if (team !== null && team !== "undefined") {
                setTeam(JSON.parse(team))
            }
        }
    };

    const storeTeam = (team: TeamType | undefined) => {
        return () => {
            if (team !== undefined) {
                window.localStorage.setItem(KEY, JSON.stringify(team))
            }
        }
    };

    const removeTeam = () => {
        window.localStorage.removeItem(KEY)
    }

    return {
        loadTeam,
        storeTeam,
        removeTeam,
    } as StorageType;
}