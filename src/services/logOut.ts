import {Track} from "../types/Track.ts";
import {Team} from "../types/Team.ts";

interface LogoutParams {
    removeTeam: () => void;
    onTeamChange: (team: Team | undefined) => void;
    removeTrack: () => void;
    onTrackChange: (track: Track | undefined) => void;
}

export const logout = ({removeTeam, onTeamChange, removeTrack, onTrackChange}: LogoutParams) => {
    return () => {
        removeTrack()
        onTrackChange(undefined)
        removeTeam()
        onTeamChange(undefined)
    }
}