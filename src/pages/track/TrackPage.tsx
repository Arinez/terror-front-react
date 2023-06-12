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
    // TODO: everytime the answer changes the page is rendered again, this is not good
    const [answer, setAnswer] = useState("");
    const [checkpoint, setCheckpoint] = useState<Checkpoint>(emptyCheckpoint);
    const [track, setTrack] = useState<Track>(emptyTrack);
    const [loading, setLoading] = useState<boolean>(true);
    const [final, setFinal] = useState<boolean>(false);

    // TODO: this loads from the server all the data on every render but it should do it?
    // TODO: this should be done after the login
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

    useEffect(() => {
        if (isFinalCheckpoint(track)) setFinal(true);
        else setFinal(false);
    }, [track]);

    function handleSubmit(e: FormEvent) {
        e.preventDefault(); // Prevents the page from reloading
        sendAnswerComponent(answer)
    }

    if (loading) return (<Loading text={"Cargando..."}/>)
    if (final) return (
        <>
            <h1>¡Felicidades! Has terminado la carrera</h1>
            <p>Regresa al punto de partida</p>
        </>
    )

    // TODO: rename this function
    function sendAnswerComponent(answerComponent: string) {
        if (answerComponent.length < 4) {
            console.error("Answer is not 4 characters long")
            return;
        } // TODO: Show error message, this is not always 4
        setLoading(true);
        let newTrack = updateTrackAnswer(track, answerComponent);
        if (!isFinalCheckpoint(track)) {
            newTrack = updateTrackStep(newTrack);
            sendAnswer(team, answerComponent, track.steps[track.currentStep].id);
        }
        setTrack(newTrack)
        setAnswer("")
        setLoading(false);
    }

    function sendOption(e: FormEvent) {
        e.preventDefault(); // Prevents the page from reloading
        if (!document.querySelector('input[name="answer"]:checked')) return; // TODO: Show error message, answer not selected
        const answer = (document.querySelector('input[name="answer"]:checked') as HTMLInputElement).value;
        sendAnswerComponent(answer)
    }

    console.log(checkpoint)
    if (checkpoint.answerType === "OPTION") return (
        <>
            <h1>{checkpoint.title}</h1>
            {checkpoint.images.length > 0 && checkpoint.images.map(image => <img src={image}/>)}
            <form onSubmit={sendOption}>
                { checkpoint.question.split("|").map(line => {
                    return (
                        <>
                            <input
                                type="radio"
                                value={line}
                                id={line}
                                name="answer"
                            />
                            <label htmlFor={line}>{line}</label>
                            <br/>
                        </>
                    );
                }) }
                <br/>
                <button type="submit">Enviar</button>
            </form>
        </>
    );

    // TODO: split all this logic into components
    return (
        <>
            <h1>{checkpoint.title}</h1>
            { checkpoint.answerType !== "OPTION" && <p>{checkpoint.question}</p> }
            { checkpoint.images.length > 0 && checkpoint.images.map(image => <img src={image} key={image}/> ) }
            <form onSubmit={handleSubmit}>
                { checkpoint.answerType === "4_CHAR" && <TextInput id="answer" placeholder="- - - -" onChange={setAnswer} maxLength={4}/> }
                { checkpoint.answerType === "TEXT" && <TextInput id="answer" placeholder="respuesta" onChange={setAnswer}/> }
                <br/>
                <button type="submit">Enviar</button>
            </form>
        </>
    );
};
