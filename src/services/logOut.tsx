import {TeamType} from "./getTeamTokenMock.tsx";

interface LogoutParams {
    removeTeam: () => void
    setTeam: (team: TeamType | undefined) => void;
}

export const logout = ({removeTeam, setTeam}: LogoutParams) => {
    return () => {
        removeTeam()
        setTeam(undefined)
    }
}