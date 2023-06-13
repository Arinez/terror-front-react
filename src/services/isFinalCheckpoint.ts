import {Track} from "../types/Track.ts";

export function isFinalCheckpoint(track: Track) {
    return track.currentStep > track.steps.length
}