import {TeamType} from "./getTeamTokenMock.ts";
import {TrackType} from "./getTrackMock.ts";

interface LogoutParams {
    removeTeam: () => void;
    onTeamChange: (team: TeamType | undefined) => void;
    removeTrack: () => void;
    onTrackChange: (track: TrackType | undefined) => void;
}

export const logout = ({removeTeam, onTeamChange, removeTrack, onTrackChange}: LogoutParams) => {
    return () => {
        removeTrack()
        onTrackChange(undefined)
        removeTeam()
        onTeamChange(undefined)
    }
}