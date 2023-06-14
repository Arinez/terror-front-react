import "./LogingPage.css";
import {Dispatch, FormEvent, useState} from "react";
import TextInput from "../../components/TextInput";
import {getTeamToken} from "../../services/getTeamToken.ts";
import {Team} from "../../types/Team.ts";
import PasswordInput from "../../components/PasswordInput.tsx";
import ErrorMessage from "../../components/ErrorMessage.tsx";
import Loading from "../../components/Loading.tsx";

type LoginPageProps = {
    useTeam: Dispatch<Team>,
}

export const LoginPage = ({useTeam}: LoginPageProps) => {
    const [isErrorShow, setIsErrorShow] = useState<boolean>();
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false)
    const [leader, setLeader] = useState('');
    const [password, setPassword] = useState('');

    function showError(message: string) {
        setIsErrorShow(true);
        setErrorMessage(message);
        setTimeout(() => {
            setIsErrorShow(false);
            setErrorMessage("");
        }, 5000);
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault(); // Prevents the page from reloading
        setLoading(true);
        getTeamToken(leader.toLowerCase(), password.toLowerCase())
            .then(team => {
                if (team.token !== undefined) {
                    useTeam(team); // FIXME: React Hook "useTeam" cannot be called inside a callback.
                }else{
                    showError('Error al iniciar sesión')
                }
            })
            .catch((e) => {
                showError('Error al iniciar sesión');
                console.error(e);
            })
            .finally(() => setLoading(false));
    };

    return (
        <div>
            {isErrorShow && <ErrorMessage message={errorMessage}/>}
            {loading && <Loading text={"Cargando..."}/>}
            <form onSubmit={handleSubmit}>
                <TextInput id="leader" placeholder="Capitan" onChange={setLeader}/>
                <br/>
                <PasswordInput id="password" placeholder="Codigo" onChange={setPassword}/>
                <br/>
                <button type="submit" disabled={loading}>Enviar</button>
            </form>
        </div>
    );
}
