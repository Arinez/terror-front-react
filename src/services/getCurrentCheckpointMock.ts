import {TrackType} from "./getTrackMock.ts";

export type CheckpointType = {
    title: string;
    question: string;
    answer: string | undefined;
}
export const getCurrentCheckpoint = (track: TrackType): CheckpointType => {
    console.log("get current checkpoint", track.currentStep)
    const currentCheckpoint = track.steps.find(step => step.order === track.currentStep)?.checkpoint;
    if (currentCheckpoint === undefined) {
        return { title: "", question: "", answer: "" }
    }
    return {
        title: currentCheckpoint?.title,
        question: currentCheckpoint?.question,
        answer: ""
    }
}