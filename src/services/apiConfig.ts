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