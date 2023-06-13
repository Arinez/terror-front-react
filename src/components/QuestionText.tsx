import {FormEvent, useState} from "react";
import {Checkpoint} from "../types/Checkpoint.ts";
import TextInput from "./TextInput.tsx";

type QuestionTextProps = {
    checkpoint: Checkpoint,
    sendAnswer: (value: string) => void,
}

export default function QuestionText({checkpoint, sendAnswer}: QuestionTextProps) {
    const [answer, setAnswer] = useState("");

    function handleSubmit(e: FormEvent) {
        e.preventDefault(); // Prevents the page from reloading
        sendAnswer(answer)
    }

    return (
        <>
            <p>{checkpoint.title}</p>
            { checkpoint.images.length > 0 && checkpoint.images.map(image => <img src={image} key={image}/> ) }
            <form onSubmit={handleSubmit}>
                <TextInput id="answer" placeholder="respuesta" onChange={setAnswer}/>
                <br/>
                <button type="submit">Enviar</button>
            </form>
        </>
    )
}

