import {FormEvent, useState} from "react";
import {Checkpoint} from "../types/Checkpoint.ts";
import ErrorMessage from "./ErrorMessage.tsx";

type QuestionOptionProps = {
    checkpoint: Checkpoint,
    sendAnswer: (value: string) => void,
}

export default function QuestionOption({checkpoint, sendAnswer}: QuestionOptionProps) {
    const [isErrorShow, setIsErrorShow] = useState<boolean>();
    const [errorMessage, setErrorMessage] = useState<string>("");

    function showError(message: string) {
        setIsErrorShow(true);
        setErrorMessage(message);
        setTimeout(() => {
            setIsErrorShow(false);
            setErrorMessage("");
        }, 5000);
    }

    function sendOption(e: FormEvent) {
        e.preventDefault(); // Prevents the page from reloading
        if (!document.querySelector('input[name="answer"]:checked')) {
            console.error("Answer not selected")
            showError("Debes seleccionar una respuesta")
            return;
        } // TODO: Show error message, answer not selected
        const answer = (document.querySelector('input[name="answer"]:checked') as HTMLInputElement).value;
        sendAnswer(answer)
        setIsErrorShow(false);
    }

    return (
        <>
            <h2>{checkpoint.title}</h2>
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
                {isErrorShow && <ErrorMessage message={errorMessage}/>}
                <button type="submit">Enviar</button>
            </form>
        </>
    )
}

