import {Team} from "../types/Team.ts";

export const HOST = "https://terrorapi.xn--ariez-qta.com/api"
const getLoginUrl = () => `${HOST}/team/login`
const requestOptions = {
    method: "post",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
};

export const getTeamToken = (leader: string, password: string): Promise<Team> => {
    const url = getLoginUrl()
    const body = JSON.stringify({
        "username": leader,
        "password": password
    });

    return new Promise((resolve, reject) => {
        fetch(url, {...requestOptions, body})
            .then(response => response.text())
            .then(response => {
                const token = JSON.parse(response).access_token;
                resolve({leader, token})
            })
            .catch(reject)
    })
}
