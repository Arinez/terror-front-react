import './App.css'
import {LoginPage} from './pages/login/LoginPage.tsx'
import {TeamType} from './services/getTeamTokenMock.ts'
import {useEffect, useState} from "react";
import {TrackPage} from "./pages/track/TrackPage.tsx";
import Loading from "./components/Loading.tsx";
import {TeamStorage} from "./services/teamStorage.ts";
import LogOut from "./components/LogOut.tsx";
import {logout} from "./services/logOut.ts";

type AppProps = {
    teamStorage: TeamStorage,
}
function App({teamStorage}: AppProps) {
    const [team, setTeam] = useState<TeamType>()
    const [loading, setLoading] = useState<boolean>(false)

    useEffect( () => {
        const teamFromStorage = teamStorage.load()
        setTeam(teamFromStorage)
    }, [])
    useEffect(teamStorage.store(team), [team])

    if (loading) return (<Loading text={"Cargando..."}/>)

    if (!team) {
        return (
            <LoginPage useTeam={setTeam} setLoading={setLoading}/>
        )
    }
    if (team?.token !== "admin token") {
        return (<TrackPage team={team} removeTeam={teamStorage.remove} onTeamChange={setTeam}/> )
    }
    return (<>
        <LogOut text={"Pa tu casa"} logout={logout({removeTeam : teamStorage.remove, onTeamChange : setTeam})}/>
        Logged in with: {team.token}
    </>)
}

export default App
