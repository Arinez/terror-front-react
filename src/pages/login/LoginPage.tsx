import "./LogingPage.css";
import {Dispatch, FormEvent, useState} from "react";
import TextInput from "../../components/TextInput";
import {getTeamToken} from "../../services/getTeamToken.ts";
import {Team} from "../../types/Team.ts";
import PasswordInput from "../../components/PasswordInput.tsx";

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
        getTeamToken(leader.toLowerCase(), password)
            .then(team => {
                if (team.token !== undefined && team.token !== "incorrect") {
                    useTeam(team); // FIXME: React Hook "useTeam" cannot be called inside a callback.
                }
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <TextInput id="leader" placeholder="Capitan" onChange={setLeader}/>
                <br/>
                <PasswordInput id="password" placeholder="Codigo" onChange={setPassword}/>
                <br/>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}
