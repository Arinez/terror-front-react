import {Dispatch} from "react";
import {TeamType} from "./getTeamTokenMock.tsx";

export type StorageType = {
    loadTeam: (setTeam: Dispatch<TeamType>) => () => void,
    storeTeam: (team: TeamType | undefined) => () => void,
}

export const LocalStorage = () => {
    const loadTeam = (setTeam: Dispatch<TeamType>) => {
        return () => {
            const team = localStorage.getItem("team");
            if (team !== null && team !== "undefined") {
                setTeam(JSON.parse(team))
            }
        }
    };

    const storeTeam = (team: TeamType | undefined) => {
        return () => {
            if (team !== undefined) {
                window.localStorage.setItem("team", JSON.stringify(team))
            }
        }
    };

    return {
        loadTeam,
        storeTeam,
    } as StorageType;
}