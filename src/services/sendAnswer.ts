import {Team} from "../types/Team.ts";
import {getSendAnswerRequestOptions, getSendAnswerUrl} from "./apiConfig.ts";

const thirtySecondaryTimeout = 30000;

export const sendAnswer = async (team: Team, answer: string, checkpointId: number): Promise<void> => {
    const url = getSendAnswerUrl();
    const body = JSON.stringify({
        "tracking_id": checkpointId.toString(),
        "team_answer": answer,
    })

    let pending = true;
    while (pending) {
        await fetch(url, {...getSendAnswerRequestOptions(team), body})
            .then(r => {
                if (r.status === 200) {
                    pending = false;
                    console.log("Answer sent")
                }
                if (r.status === 409) {
                    pending = false;
                    console.log("Answer already sent");
                }
                pending = false;
            })
            .catch(console.error)
        await new Promise(resolve => setTimeout(resolve, thirtySecondaryTimeout));
    }
}