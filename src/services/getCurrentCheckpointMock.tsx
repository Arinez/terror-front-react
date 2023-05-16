import {CheckpointType, TeamType} from "./getTeamTokenMock.tsx";

export const getCurrentCheckpoint = (team: TeamType): CheckpointType => {
    console.log("get current checkpoint", team.leader);
    return {
        question: "my question",
        answer: undefined
    };
}