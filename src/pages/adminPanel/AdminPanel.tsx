import {useEffect, useState} from "react";
import ErrorMessage from "../../components/ErrorMessage.tsx";
import Loading from "../../components/Loading.tsx";
import {Admin} from "../../types/Admin.ts";
import {createTeam, getTeams} from "../../services/adminApiConfig.ts";
import {AdminTeam} from "../../types/AdminTeam.ts";

type AdminPanelProps = {
    admin: Admin,
}

export const AdminPanel = ({admin}: AdminPanelProps) => {
    const [isErrorShow, setIsErrorShow] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false)
    const [teams, setTeams] = useState<AdminTeam[]>([])
    const [showCreateTeam, setShowCreateTeam] = useState<boolean>(false)

    useEffect(() => {
        setLoading(true);
        getTeams(admin.token)
            .then(setTeams)
            .catch((e) => {
                console.error(e);
                showError('Error al cargar equipos');
            })
            .finally(() => setLoading(false));
    }, [])

    function showError(message: string) {
        setIsErrorShow(true);
        setErrorMessage(message);
        setTimeout(() => {
            setIsErrorShow(false);
            setErrorMessage("");
        }, 5000);
    }

    const showCreateTeamPanel = () => {
        setShowCreateTeam(true)
    };

    const sendTeam = (e) => {
        e.preventDefault();
        const name = e.target[0].value;
        const leader = e.target[1].value;
        const members = e.target[2].value;
        const password = e.target[3].value;
        setLoading(true);
        createTeam(admin.token, name, leader, members, password)
            .catch((e) => {
                console.error(e);
                showError('Error al cargar equipos');
            })
            .finally(() => setLoading(false));
        console.log(name, leader, members, password)
    }

    if (showCreateTeam) return (
        <>
            <p>Create team</p>
            <form onSubmit={sendTeam}>
                <label htmlFor="name">Nombre</label>
                <input type="text" id="name"/>
                <br/>
                <label htmlFor="leader">Lider</label>
                <input type="text" id="leader"/>
                <br/>
                <label htmlFor="members">Miembros</label>
                <input type="text" id="members"/>
                <br/>
                <label htmlFor="password">password</label>
                <input type="text" id="password"/>
                <br/>
                <button type="submit">Crear</button>
            </form>
            <br/>
            <button onClick={() => setShowCreateTeam(false)}>Cancelar</button>
        </>
    )

    return (
        <div>
            <h1>AdminPanel</h1>
            {isErrorShow && <ErrorMessage message={errorMessage}/>}
            {loading && <Loading text={"Cargando..."}/>}
            {teams.length > 0 &&
                <>
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Lider</th>
                            <th>Miembros</th>
                        </tr>
                        </thead>
                        <tbody>
                        {teams.map((team) => (
                            <tr key={team.id}>
                                <td>{team.id}</td>
                                <td>{team.name}</td>
                                <td>{team.leader}</td>
                                <td>{team.members}</td>
                                <td>
                                    <button>Ver</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <button onClick={showCreateTeamPanel}>Crear equipo</button>
                </>
            }
        </div>
    );
}
