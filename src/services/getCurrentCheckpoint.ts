import {Track} from "../types/Track.ts";
import {Checkpoint} from "../types/Checkpoint.ts";

export const getCurrentCheckpoint = (track: Track): Checkpoint => {
    const currentCheckpoint = track.steps.find(step => step.order === track.currentStep)?.checkpoint;
    if (currentCheckpoint === undefined) {
        return {answerType: "", images: [], title: "", question: "", answer: "" }
    }
    return {
        title: currentCheckpoint?.title,
        question: currentCheckpoint?.question,
        answer: "",
        answerType: currentCheckpoint?.answerType,
        images: currentCheckpoint?.images
    }
}