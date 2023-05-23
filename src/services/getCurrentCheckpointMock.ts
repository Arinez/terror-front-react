import {TrackType} from "./getTrackMock.ts";

export type CheckpointType = {
    title: string;
    question: string;
    answer: string | undefined;
}
export const getCurrentCheckpoint = (track: TrackType): Promise<CheckpointType> => {
    console.log("get current checkpoint", track.currentStep)
    return new Promise(resolve => {
        const currentCheckpoint = track.steps.find(step => step.order === track.currentStep)?.checkpoint;
        if (currentCheckpoint === undefined) resolve({
            title: "Has terminado",
            question: "Regresa al punto de partida",
            answer: ""
        });
        else resolve({
            title: currentCheckpoint?.title,
            question: currentCheckpoint?.question,
            answer: ""
        })
    });
}