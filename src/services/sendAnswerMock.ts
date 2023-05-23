import {TeamType} from "./getTeamTokenMock.ts";

export const sendAnswer = (team: TeamType, answer: string): void => {
    console.log("send answer", team.leader, answer);
}