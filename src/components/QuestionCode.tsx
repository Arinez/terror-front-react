import {FormEvent, useState} from "react";
import {Checkpoint} from "../types/Checkpoint.ts";
import CodeInput from "./CodeInput.tsx";
import ErrorMessage from "./ErrorMessage.tsx";

type QuestionCodeProps = {
    checkpoint: Checkpoint,
    sendAnswer: (value: string) => void,
}

export default function QuestionCode({checkpoint, sendAnswer}: QuestionCodeProps) {
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
        if (answer.length !== 4) {
            console.error("Answer must be 4 characters long")
            showError("La respuesta debe tener 4 caracteres")
            return;
        } // TODO: Show error message, answer not selected
        sendAnswer(answer)
        setIsErrorShow(false);
    }

    return (
        <>
            <h2>{checkpoint.title}</h2>
            { <p>{checkpoint.question}</p> }
            { checkpoint.images.length > 0 && checkpoint.images.map(image => <img src={image} key={image}/> ) }
            <form onSubmit={handleSubmit}>
                <CodeInput id="answer" placeholder="- - - -" onChange={setAnswer}/>
                <br/>
                {isErrorShow && <ErrorMessage message={errorMessage}/>}
                <button type="submit">Enviar</button>
            </form>
        </>
    )
}

