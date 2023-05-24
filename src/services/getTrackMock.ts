import {TeamType} from "./getTeamTokenMock.ts";
import {CheckpointType} from "./getCurrentCheckpointMock.ts";

export type StepType = {
    id: number;
    order: number;
    checkpoint: CheckpointType
}

export type TrackType = {
    currentStep: number;
    steps: StepType[];
}

const responseMock = [
    {
        "id": 1,
        "step": 1,
        "checkpoint": {
            "id": 1,
            "name": "Checkpoint 1",
            "question": "Question 1"
        }
    },
    {
        "id": 2,
        "step": 2,
        "checkpoint": {
            "id": 2,
            "name": "Checkpoint 2",
            "question": "Question 2"
        }
    },
    {
        "id": 12,
        "step": 3,
        "checkpoint": {
            "id": 23,
            "name": "Checkpoint 23",
            "question": "Question 3"
        }
    }
]

export const getTrack = (team: TeamType): Promise<TrackType> => {
    console.log("get track", team.token);
    return new Promise(resolve => {
        setTimeout(() => {
            const response = responseMock.map(mapToStep);
            resolve({
                currentStep: 1,
                steps: response
            });
        }, 2000);
    });
}

const mapToStep = (step: any): StepType => {
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