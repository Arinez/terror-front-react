import {Team} from "../types/Team.ts";

export const getTeamToken = (leader: string, password: string): Promise<Team> => {
    console.log("get team token", leader, password);

    return new Promise(resolve => {
        setTimeout(() => {
            if (leader === "admin" && password === "admin") {
                resolve({leader, token: "admin token"});
            }
            if (leader === "cris") {
                resolve({leader, token:"user token"});
            }

            resolve({leader, token: "incorrect"});

        }, 2000);
    });
}
