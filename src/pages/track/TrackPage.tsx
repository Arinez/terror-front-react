import "./TrackPage.css";
import {useEffect, useState} from "react";
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
import QuestionOption from "../../components/QuestionOption.tsx";
import QuestionCode from "../../components/QuestionCode.tsx";
import QuestionText from "../../components/QuestionText.tsx";

const emptyTrack: Track = {currentStep: -1, steps: []}; // FIXME: -1 is a hack to avoid showing the final screen message

const emptyCheckpoint: Checkpoint = {
    title: "",
    question: "",
    answer: "",
    answerType: "",
    images: [],
};

type TrackProps = {
    team: Team
    storeTrack: (track: Track) => void,
}

export const TrackPage = ({team, storeTrack}: TrackProps) => {
    const [checkpoint, setCheckpoint] = useState<Checkpoint>(emptyCheckpoint);
    const [track, setTrack] = useState<Track>(emptyTrack);
    const [loading, setLoading] = useState<boolean>(true);
    const [final, setFinal] = useState<boolean>(false);

    // TODO: this loads from the server all the data on every render but it should do it?
    // TODO: this should be done after the login
    // TODO: what happens if the user do not have internet connection?
    useEffect(() => {
        getTrack(team)
            .then(setTrack)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => { storeTrack(track) }, [track]);

    useEffect(() => {
        setLoading(true);
        const currentCheckpoint = getCurrentCheckpoint(track)
        setCheckpoint(currentCheckpoint);
        setLoading(false)
    }, [track]);

    useEffect(() => {
        if (isFinalCheckpoint(track)) setFinal(true);
        else setFinal(false);
    }, [track]);

    // TODO: rename this function
    function sendAnswerComponent(answerComponent: string) {
        setLoading(true);
        let newTrack = updateTrackAnswer(track, answerComponent);
        if (!isFinalCheckpoint(track)) {
            newTrack = updateTrackStep(newTrack);
            const checkpointId = track.steps[track.currentStep - 1].id;
            sendAnswer(team, answerComponent, checkpointId);
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
            { checkpoint.answerType == "OPTION" && <QuestionOption checkpoint={checkpoint} sendAnswer={sendAnswerComponent}/>}
            { checkpoint.answerType == "4_CHAR" && <QuestionCode checkpoint={checkpoint} sendAnswer={sendAnswerComponent}/>}
            { checkpoint.answerType == "TEXT" && <QuestionText checkpoint={checkpoint} sendAnswer={sendAnswerComponent}/>}
        </>
    );
};
