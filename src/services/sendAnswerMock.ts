import {Team} from "../types/Team.ts";

// TODO retry on error
export const sendAnswer = (team: Team, answer: string): void => {
    console.log("send answer", team.leader, answer);
}