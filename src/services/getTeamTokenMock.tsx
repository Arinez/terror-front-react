export type CheckpointType = {
    question: string;
    answer: string | undefined;
}

export type TeamType = { // TODO: move to isolate type file
    leader: string;
    token: string;
}

export const getTeamToken = (leader: string, password: string): TeamType => {
    if (leader === "admin" && password === "admin") {
        return {leader, token: "admin token"};
    }
    if (leader === "cris") {
        return {leader, token:"user token"}
    }

    return {leader, token: "incorrect"};
}
