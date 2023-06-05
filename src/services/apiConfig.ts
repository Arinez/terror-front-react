import {Team} from "../types/Team.ts";

export const HOST = "https://terrorapi.xn--ariez-qta.com/api"
export const getLoginUrl = () => `${HOST}/team/login`
export const getTrackUrl = () => `${HOST}/team/tracking`
export const getTrackRequestOptions = (team: Team) => {
    return {
        method: "get",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + team.token
        }
    }
}
export const getSendAnswerUrl = () => `${HOST}/team/tracking`

export const getSendAnswerRequestOptions = (team: Team) => {
    return {
        method: "post",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + team.token
        },
    }
}

export const getCurrentStepUrl = () => `${HOST}/team/step`

export const getCurrentStepRequestOptions = (team: Team) => {
    return {
        method: "get",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + team.token
        },
    }
}
