import {Track} from "../types/Track.ts";
import {Checkpoint} from "../types/Checkpoint.ts";

export const getCurrentCheckpoint = (track: Track): Checkpoint => {
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