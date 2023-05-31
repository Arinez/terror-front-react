import {FormEvent, useEffect, useState} from "react";
import TextInput from "../../components/TextInput";
import {getCurrentCheckpoint} from "../../services/getCurrentCheckpointMock.ts";
import {sendAnswer} from "../../services/sendAnswerMock.ts";
import Loading from "../../components/Loading.tsx";
import LogOut from "../../components/LogOut.tsx";
import {logout} from "../../services/logOut.ts";
import {getTrack} from "../../services/getTrack.ts";
import {updateTrackStep} from "../../services/updateTrackStep.ts";
import {isFinalCheckpoint} from "../../services/isFinalCheckpoint.ts";
import {updateTrackAnswer} from "../../services/updateTrackAnswer.ts";
import {Track} from "../../types/Track.ts";
import {Checkpoint} from "../../types/Checkpoint.ts";
import {Team} from "../../types/Team.ts";

const emptyTrack: Track = {currentStep: 1, steps: []};

const emptyCheckpoint: Checkpoint = {
    title: "",
    question: "",
    answer: ""
};

type TrackProps = {
    team: Team,
    onTeamChange: (team: Team | undefined) => void,
    removeTeam: () => void,
    storeTrack: (track: Track) => void,
    removeTrack: () => void,
}

export const TrackPage = ({team, onTeamChange, removeTeam, storeTrack, removeTrack}: TrackProps) => {
    const [answer, setAnswer] = useState("");
    const [checkpoint, setCheckpoint] = useState<Checkpoint>(emptyCheckpoint);
    const [track, setTrack] = useState<Track>(emptyTrack);
    const [loading, setLoading] = useState<boolean>(true);
    const [final, setFinal] = useState<boolean>(false);

    useEffect(() => {
        console.log("get track use effect");
        getTrack(team)
            .then(setTrack)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        console.log("get current checkpoint use effect", track);
        setLoading(true);
        storeTrack(track);
        const currentCheckpoint = getCurrentCheckpoint(track)
        setCheckpoint(currentCheckpoint);
        setLoading(false)
    }, [track]);

    function handleSubmit(e: FormEvent) {
        e.preventDefault(); // Prevents the page from reloading
        setLoading(true);
        sendAnswer(team, answer);
        let newTrack = updateTrackAnswer(track, answer);
        if (isFinalCheckpoint(track)) setFinal(true);
        else newTrack = updateTrackStep(newTrack);
        setTrack(newTrack)
        setLoading(false);
    }

    if (loading) return (<Loading text={"Cargando..."}/>)
    if (final) return (
        <>
            <LogOut text={"Cerrar Sesión"} logout={
                logout({
                    removeTeam: removeTeam,
                    onTeamChange: onTeamChange,
                    removeTrack: removeTrack,
                    onTrackChange: setTrack
                })
            }/>
            <h1>¡Felicidades! Has terminado la carrera</h1>
            <p>Regresa al punto de partida</p>
        </>
    )

    return (
        <>
            <LogOut text={"Cerrar Sesión"} logout={
                logout({
                    removeTeam: removeTeam,
                    onTeamChange: onTeamChange,
                    removeTrack: removeTrack,
                    onTrackChange: setTrack
                })
            }/>
            <h1>{checkpoint.title}</h1>
            <p>{checkpoint.question}</p>
            <form onSubmit={handleSubmit}>
                <TextInput id="answer" placeholder="----" onChange={setAnswer}/>
                <br/>
                <button type="submit">Enviar</button>
            </form>
        </>
    );
};
