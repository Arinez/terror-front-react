import {FormEvent, useEffect, useState} from "react";
import TextInput from "../../components/TextInput";
import {CheckpointType, TeamType} from "../../services/getTeamTokenMock.tsx";
import {getCurrentCheckpoint} from "../../services/getCurrentCheckpointMock.tsx";
import {sendAnswer} from "../../services/sendAnswerMock.tsx";
import Loading from "../../components/Loading.tsx";
import LogOut from "../../components/LogOut.tsx";
import {logout} from "../../services/logOut.tsx";

const emptyCheckpoint: CheckpointType = {question: "", answer: ""};

type TrackProps = {
    team: TeamType,
    setTeam: (team: TeamType | undefined) => void,
    removeTeam: () => void,
}
export const TrackPage = ({team, setTeam, removeTeam}: TrackProps) => {
    const [answer, setAnswer] = useState("");
    const [checkpoint, setCheckpoint] = useState<CheckpointType>(emptyCheckpoint);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getCurrentCheckpoint(team)
            .then(setCheckpoint)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    function handleSubmit(e: FormEvent) {
        e.preventDefault(); // Prevents the page from reloading
        setLoading(true);
        sendAnswer(team, answer);
        getCurrentCheckpoint(team)
            .then(setCheckpoint)
            .catch(console.error)
            .finally(() => setLoading(false));
    }

    if (loading) return (<Loading text={"Cargando..."}/>)

    return (
        <>
            <LogOut text={"pa tu casa"} logout={logout({removeTeam : removeTeam, setTeam : setTeam})}/>
            <div>
                <form onSubmit={handleSubmit}>
                    <p>{checkpoint.question}</p>
                    <TextInput id="answer" placeholder="----" onChange={setAnswer}/>
                    <br/>
                    <button type="submit">Enviar</button>
                </form>
            </div>
        </>
    );
};
