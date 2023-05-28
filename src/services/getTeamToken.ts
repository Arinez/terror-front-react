import {Team} from "../types/Team.ts";

export const HOST = "https://terrorapi.xn--ariez-qta.com/api"
const getLoginUrl = () => `${HOST}/team/login`

export const getTeamToken = (leader: string, password: string): Promise<Team> => {
    console.log("get team token", leader, password);

    const url = getLoginUrl()
    fetch(url, {
        method: "post",
        mode: "no-cors",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "username": leader,
            "password": password
        })
    })
        .then(r => console.log(r))
        .catch(console.error)

    return new Promise(resolve => {
        setTimeout(() => {
            if (leader === "admin" && password === "admin") {
                resolve({leader, token: "admin token"});
            }
            if (leader === "cris") {
                resolve({leader, token: "user token"});
            }

            resolve({leader, token: "incorrect"});

        }, 2000);
    });
}
