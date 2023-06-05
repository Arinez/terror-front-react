import {Track} from "../types/Track.ts";
import {Step} from "../types/Step.ts";
import {Team} from "../types/Team.ts";
import {getTrackRequestOptions, getTrackUrl} from "./apiConfig.ts";

export const getTrack = (team: Team): Promise<Track> => {
    return new Promise((resolve, reject) => {
        const url = getTrackUrl();
        fetch(url, getTrackRequestOptions(team))
            .then(r => r.json())
            .then(response => {
                const steps = response.map(mapToStep);
                resolve({
                    currentStep: 1, // TODO: get current step from other request
                    steps
                });
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
        }
    }
}