export type CheckpointType = {
    question: string;
    answer: string | undefined;
}

export type TeamType = { // TODO: move to isolate type file
    leader: string;
    token: string;
}

export const getTeamToken = (leader: string, password: string):Promise<TeamType> => {
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
