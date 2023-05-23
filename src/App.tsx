import './App.css'
import {LoginPage} from './pages/login/LoginPage.tsx'
import {TeamType} from './services/getTeamTokenMock.ts'
import {useEffect, useState} from "react";
import {TrackPage} from "./pages/track/TrackPage.tsx";
import Loading from "./components/Loading.tsx";
import {StorageType} from "./services/localStorage.ts";
import LogOut from "./components/LogOut.tsx";
import {logout} from "./services/logOut.ts";

type AppProps = {
    storage: StorageType,
}
function App({storage}: AppProps) {
    const [team, setTeam] = useState<TeamType>()
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(storage.loadTeam(setTeam), [])
    useEffect(storage.storeTeam(team), [team])

    if (loading) return (<Loading text={"Cargando..."}/>)

    if (!team) {
        return (
            <LoginPage useTeam={setTeam} setLoading={setLoading}/>
        )
    }
    if (team?.token !== "admin token") {
        return (<TrackPage team={team} removeTeam={storage.removeTeam} onTeamChange={setTeam}/> )
    }
    return (<>
        <LogOut text={"Pa tu casa"} logout={logout({removeTeam : storage.removeTeam, onTeamChange : setTeam})}/>
        Logged in with: {team.token}
    </>)
}

export default App
