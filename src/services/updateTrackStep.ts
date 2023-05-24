import {Track} from "../types/Track.ts";

export const updateTrackStep = (track: Track): Track => {
    return {
        currentStep: track.currentStep + 1,
        steps: track.steps
    }
}