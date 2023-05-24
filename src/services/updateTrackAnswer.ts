import {Track} from "../types/Track.ts";
import {Step} from "../types/Step.ts";

export const updateTrackAnswer = (track: Track, answer: string): Track => {
    return {
        ...track,
        steps: track.steps.map((step: Step) => {
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