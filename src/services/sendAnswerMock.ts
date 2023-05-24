import {TeamType} from "./getTeamTokenMock.ts";

// TODO retry on error
export const sendAnswer = (team: TeamType, answer: string): void => {
    console.log("send answer", team.leader, answer);
}