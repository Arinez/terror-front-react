import "./TrackPage.css";
import {FormEvent, useEffect, useState} from "react";
import TextInput from "../../components/TextInput";
import {getCurrentCheckpoint} from "../../services/getCurrentCheckpoint.ts";
import {sendAnswer} from "../../services/sendAnswer.ts";
import Loading from "../../components/Loading.tsx";
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
    team: Team
    storeTrack: (track: Track) => void,
}

export const TrackPage = ({team, storeTrack}: TrackProps) => {
    const [answer, setAnswer] = useState("");
    const [checkpoint, setCheckpoint] = useState<Checkpoint>(emptyCheckpoint);
    const [track, setTrack] = useState<Track>(emptyTrack);
    const [loading, setLoading] = useState<boolean>(true);
    const [final, setFinal] = useState<boolean>(false);

    useEffect(() => {
        getTrack(team)
            .then(setTrack)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        setLoading(true);
        storeTrack(track);
        const currentCheckpoint = getCurrentCheckpoint(track)
        setCheckpoint(currentCheckpoint);
        setLoading(false)
    }, [track]);

    function handleSubmit(e: FormEvent) {
        e.preventDefault(); // Prevents the page from reloading
        if (answer.length !== 4) return; // TODO: Show error message
        setLoading(true);
        let newTrack = updateTrackAnswer(track, answer);
        if (isFinalCheckpoint(track)) setFinal(true);
        else {
            newTrack = updateTrackStep(newTrack);
            sendAnswer(team, answer, track.steps[track.currentStep].id);
        }
        setTrack(newTrack)
        setLoading(false);
    }

    if (loading) return (<Loading text={"Cargando..."}/>)
    if (final) return (
        <>
            <h1>¡Felicidades! Has terminado la carrera</h1>
            <p>Regresa al punto de partida</p>
        </>
    )

    return (
        <>
            <h1>{checkpoint.title}</h1>
            <p>{checkpoint.question}</p>
            <form onSubmit={handleSubmit}>
                <TextInput id="answer" placeholder="- - - -" onChange={setAnswer} maxLength={4}/>
                <br/>
                <button type="submit">Enviar</button>
            </form>
        </>
    );
};
