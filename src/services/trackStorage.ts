import {Track} from "../types/Track.ts";

export type TrackStorage = {
    load: () => Track | undefined,
    store: (track: Track | undefined) => () => void,
    remove: () => void,
}
const KEY = "track";
export const TrackStorage = {
    load: () => {
        const track = localStorage.getItem(KEY);
        if (track !== null && track !== "undefined") {
            return JSON.parse(track);
        }
        return undefined;
    },
    store: (track: Track | undefined) => {
        if (track !== undefined) {
            window.localStorage.setItem(KEY, JSON.stringify(track));
        }
    },
    remove: () => {
        window.localStorage.removeItem(KEY);
    }
} as TrackStorage;