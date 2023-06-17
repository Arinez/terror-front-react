import {Admin} from "../types/Admin.ts";
import {AdminTeam} from "../types/AdminTeam.ts";

export const HOST = "https://terrorapi.xn--ariez-qta.com/api/admin"


export const getAdminToken = (email: string, password: string): Promise<Admin> => {
    const requestOptions = {
        method: "post",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    }
    const url = `${HOST}/login`
    const body = JSON.stringify({email, password})

    return new Promise((resolve, reject) => {
        fetch(url, {...requestOptions, body})
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    reject(response.statusText);
                }
            })
            .then(response => resolve({token: response.access_token, email}))
            .catch(reject)
    })
}

export const getTeams = (token: string): Promise<AdminTeam> => {
    const requestOptions = {
        method: "get",
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    const url = `${HOST}/teams`
    return new Promise((resolve, reject) => {
        fetch(url, requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    reject(response.statusText);
                }
            })
            .then(response => {
                resolve(response.map(formatTeam))
            })
            .catch(reject)
    })
}

const formatTeam = (team: any): AdminTeam => {
    return {
        id: team.id,
        name: team.name,
        leader: team.username,
        members: team.members,
        tracking: team.team_tracking
    }
}

export const createTeam = (token: string, name: string, leader: string, members: string[], password: string): Promise<boolean> => {
    const requestOptions = {
        method: "post",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    const url = `${HOST}/teams`
    const body = JSON.stringify({name, username: leader, members, password})

    return new Promise((resolve, reject) => {
        fetch(url, {...requestOptions, body})
            .then(response => {
                if (response.ok) {
                    resolve(true);
                } else {
                    reject(response.statusText);
                }
            })
            .catch(reject)
    })
}