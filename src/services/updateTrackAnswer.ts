import {StepType, TrackType} from "./getTrackMock.ts";

export const updateTrackAnswer = (track: TrackType, answer: string): TrackType => {
    return {
        ...track,
        steps: track.steps.map((step: StepType) => {
            if (step.order !== track.currentStep) {
                return step;
            }
            return {
                ...step,
                checkpoint: {
                    ...step.checkpoint,
                    answer: answer
                }
            };
        })
    };
}