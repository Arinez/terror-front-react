import {Dispatch, FormEvent, useState} from "react";
import TextInput from "../../components/TextInput";
import {getTeamToken} from "../../services/getTeamTokenMock.ts";
import {Team} from "../../types/Team.ts";

type LoginPageProps = {
    useTeam: Dispatch<Team>,
    setLoading: Dispatch<boolean>,
}

export const LoginPage = ({useTeam, setLoading}: LoginPageProps) => {
    const [leader, setLeader] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault(); // Prevents the page from reloading
        setLoading(true);
        getTeamToken(leader, password)
            .then(response => {
                if (response.token !== "incorrect") {
                    useTeam(response); // FIXME: React Hook "useTeam" cannot be called inside a callback.
                }else {
                    console.error("Credentials incorrect");
                }
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <TextInput id="leader" placeholder="Capitan" onChange={setLeader}/>
                <TextInput id="password" placeholder="Codigo" onChange={setPassword}/>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}
