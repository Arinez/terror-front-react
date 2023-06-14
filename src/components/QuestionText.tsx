import {FormEvent, useState} from "react";
import {Checkpoint} from "../types/Checkpoint.ts";
import TextInput from "./TextInput.tsx";
import ErrorMessage from "./ErrorMessage.tsx";

type QuestionTextProps = {
    checkpoint: Checkpoint,
    sendAnswer: (value: string) => void,
}

export default function QuestionText({checkpoint, sendAnswer}: QuestionTextProps) {
    const [isErrorShow, setIsErrorShow] = useState<boolean>();
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [answer, setAnswer] = useState("");

    function showError(message: string) {
        setIsErrorShow(true);
        setErrorMessage(message);
        setTimeout(() => {
            setIsErrorShow(false);
            setErrorMessage("");
        }, 5000);
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault(); // Prevents the page from reloading
        if (answer.length === 0) {
            console.error("Answer must not be empty")
            showError("La respuesta no puede estar vacía")
            return;
        }
        sendAnswer(answer)
        setIsErrorShow(false);
    }

    return (
        <>
            <p>{checkpoint.title}</p>
            { checkpoint.images.length > 0 && checkpoint.images.map(image => <img src={image} key={image}/> ) }
            <form onSubmit={handleSubmit}>
                <TextInput id="answer" placeholder="respuesta" onChange={setAnswer}/>
                <br/>
                {isErrorShow && <ErrorMessage message={errorMessage}/>}
                <button type="submit">Enviar</button>
            </form>
        </>
    )
}

