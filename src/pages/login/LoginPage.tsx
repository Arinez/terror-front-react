import {FormEvent, useState} from "react";
import TextInput from "../../components/TextInput";
import {getTeamToken, TeamType} from "../../services/getTeamTokenMock.tsx";

type LoginPageProps = {
    useTeam: (team: TeamType) => void,
}

export const LoginPage = ({useTeam}: LoginPageProps) => {
    const [leader, setLeader] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault(); // Prevents the page from reloading
        const response = getTeamToken(leader, password);
        if (response.token !== "incorrect"){
            useTeam(response);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <TextInput id="leader" placeholder="Capitan" updateData={setLeader}/>
                <TextInput id="password" placeholder="Codigo" updateData={setPassword}/>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}
