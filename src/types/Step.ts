import {Checkpoint} from "./Checkpoint.ts";

export type Step = {
    id: number;
    order: number;
    checkpoint: Checkpoint
}