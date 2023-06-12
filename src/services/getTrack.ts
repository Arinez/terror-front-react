import {Track} from "../types/Track.ts";
import {Step} from "../types/Step.ts";
import {Team} from "../types/Team.ts";
import {getCurrentStepRequestOptions, getCurrentStepUrl, getTrackRequestOptions, getTrackUrl} from "./apiConfig.ts";

const FINAL_STEP = 0;
export const getTrack = (team: Team): Promise<Track> => {
    return new Promise((resolve, reject) => {
        fetch(getTrackUrl(), getTrackRequestOptions(team))
            .then(r => r.json())
            .then(trackResponse => {
                // TODO: migrate to promise.all
                fetch(getCurrentStepUrl(), getCurrentStepRequestOptions(team))
                    .then(r => r.json())
                    .then(currentStepResponse => {
                            resolve({
                                currentStep: currentStepResponse.step == FINAL_STEP ? 999 : currentStepResponse.step, // FIXME: 999 is a hack to set up at the end of the track
                                steps: trackResponse.map(mapToStep)
                            });
                        }
                    )
                    .catch(reject)
            })
            .catch(reject);
    });
}

const mapToStep = (step: any): Step => {
    return {
        id: step.id,
        order: step.step,
        checkpoint: {
            title: step.checkpoint.name,
            question: step.checkpoint.question,
            answer: "",
            answerType: step.checkpoint.answerType,
            images: step.images,
        }
    }
}
