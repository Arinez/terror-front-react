import {FormEvent, useState} from "react";
import TextInput from "../../components/TextInput";
import {CheckpointType, TeamType} from "../../services/getTeamTokenMock.tsx";
import {getCurrentCheckpoint} from "../../services/getCurrentCheckpointMock.tsx";
import {sendAnswer} from "../../services/sendAnswerMock.tsx";

type TrackProps = {
    team: TeamType,
}
export const TrackPage = ({team}: TrackProps) => {
    const [answer, setAnswer] = useState("");
    const [checkpoint, setCheckpoint] = useState<CheckpointType>(getCurrentCheckpoint(team));

    function handleSubmit(e: FormEvent) {
        e.preventDefault(); // Prevents the page from reloading
        sendAnswer(team, answer);
        const newCheckpoint = getCurrentCheckpoint(team);
        setCheckpoint(newCheckpoint);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <p>{checkpoint.question}</p>
                <TextInput id="answer" placeholder="----" updateData={setAnswer}/>
                <br/>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
};
