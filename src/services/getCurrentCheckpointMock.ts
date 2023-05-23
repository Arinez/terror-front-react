import {CheckpointType, TeamType} from "./getTeamTokenMock.ts";

const questions: string[] = [
  "¿Cuál es el nombre de la primera persona que llegó a la luna?",
  "¿Como se llama el primer perro en el espacio?",
  "¿Donde se encuentra el centro de control de la NASA?",
  "¿Cuantos planetas hay en el sistema solar?",
];

let currentQuestion = 0;
export const getCurrentCheckpoint = (team: TeamType): Promise<CheckpointType> => {
    console.log("get current checkpoint", team.leader);
    if (currentQuestion >= questions.length) currentQuestion = 0;
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                question: questions[currentQuestion++],
                answer: ""
            })
        }, 2000);
    });
}