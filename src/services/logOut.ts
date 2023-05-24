import {Track} from "../types/Track.ts";
import {Team} from "../types/Team.ts";

interface LogoutParams {
    removeTeam: () => void;
    onTeamChange: (team: Team | undefined) => void;
    removeTrack: () => void;
    onTrackChange: (track: Track) => void;
}

export const logout = ({removeTeam, onTeamChange, removeTrack, onTrackChange}: LogoutParams) => {
    return () => {
        removeTrack()
        const emptyTrack = {steps: [], currentStep: 0};
        onTrackChange(emptyTrack)
        removeTeam()
        onTeamChange(undefined)
    }
}