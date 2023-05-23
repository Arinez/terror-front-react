import {TeamType} from "./getTeamTokenMock.ts";

interface LogoutParams {
    removeTeam: () => void
    onTeamChange: (team: TeamType | undefined) => void;
}

export const logout = ({removeTeam, onTeamChange}: LogoutParams) => {
    return () => {
        removeTeam()
        onTeamChange(undefined)
    }
}