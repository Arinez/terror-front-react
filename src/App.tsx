import './App.css'
import {LoginPage} from './pages/login/LoginPage.tsx'
import {TeamType} from './services/getTeamTokenMock.tsx'
import {useState} from "react";
import {TrackPage} from "./pages/track/TrackPage.tsx";
import Loading from "./components/Loading.tsx";

function App() {
    const [team, setTeam] = useState<TeamType>()
    const [loading, setLoading] = useState<boolean>(false)

    if (loading) return (<Loading text={"Cargando..."}/>)

    if (!team) {
        return (
            <><LoginPage useTeam={setTeam} setLoading={setLoading}></LoginPage></>
        )
    }
    if (team?.token !== "admin token") {
        return (<><TrackPage team={team}></TrackPage></>)
    }
    return (<>Logged in with: {team.token}</>)
}

export default App
