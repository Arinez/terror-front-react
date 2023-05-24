import {Track} from "../types/Track.ts";

export type TrackStorage = {
    load: () => Track | undefined,
    store: (track: Track | undefined) => () => void,
    remove: () => void,
}
const KEY = "track";
export const TrackStorage = {
    load: () => {
        console.log("load track")
        const track = localStorage.getItem(KEY);
        if (track !== null && track !== "undefined") {
            return JSON.parse(track);
        }
        return undefined;
    },
    store: (track: Track | undefined) => {
        console.log("store track", track)
        if (track !== undefined) {
            window.localStorage.setItem(KEY, JSON.stringify(track));
        }
    },
    remove: () => {
        console.log("remove track")
        window.localStorage.removeItem(KEY);
    }
} as TrackStorage;