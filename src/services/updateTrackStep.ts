import {TrackType} from "./getTrackMock.ts";

export const updateTrackStep = (track: TrackType): TrackType => {
    return {
        currentStep: track.currentStep + 1,
        steps: track.steps
    }
}