import {TrackType} from "./getTrackMock.ts";

export function isFinalCheckpoint(track: TrackType) {
    return track.steps.length === track.currentStep
}