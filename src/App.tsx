import './App.css'
import {LoginPage} from './pages/login/LoginPage.tsx'
import {TeamType} from './services/getTeamTokenMock.tsx'
import {useEffect, useState} from "react";
import {TrackPage} from "./pages/track/TrackPage.tsx";
import Loading from "./components/Loading.tsx";

function App() {
    const [team, setTeam] = useState<TeamType>()
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        const team = localStorage.getItem("team");
        if (team !== null && team !== "undefined") {
            setTeam(JSON.parse(team))
        }
    }, [])

    useEffect(() => {
        if (team !== undefined) {
            window.localStorage.setItem("team", JSON.stringify(team))
        }
    }, [team])

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
