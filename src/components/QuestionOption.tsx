import {FormEvent} from "react";
import {Checkpoint} from "../types/Checkpoint.ts";

type QuestionOptionProps = {
    checkpoint: Checkpoint,
    sendAnswer: (value: string) => void,
}

export default function QuestionOption({checkpoint, sendAnswer}: QuestionOptionProps) {

    function sendOption(e: FormEvent) {
        e.preventDefault(); // Prevents the page from reloading
        if (!document.querySelector('input[name="answer"]:checked')) return; // TODO: Show error message, answer not selected
        const answer = (document.querySelector('input[name="answer"]:checked') as HTMLInputElement).value;
        sendAnswer(answer)
    }

    return (
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
    )
}

