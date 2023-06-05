import './App.css'
import {LoginPage} from './pages/login/LoginPage.tsx'
import {useEffect, useState} from "react";
import {TrackPage} from "./pages/track/TrackPage.tsx";
import Loading from "./components/Loading.tsx";
import {TeamStorage} from "./services/teamStorage.ts";
import LogOut from "./components/LogOut.tsx";
import {logout} from "./services/logOut.ts";
import {TrackStorage} from "./services/trackStorage.ts";
import {Team} from "./types/Team.ts";

type AppProps = {
    teamStorage: TeamStorage,
    trackStorage: TrackStorage,
}
function App({teamStorage, trackStorage}: AppProps) {
    const [team, setTeam] = useState<Team>()
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
        return (<TrackPage
            team={team}
            removeTeam={teamStorage.remove}
            onTeamChange={setTeam}
            storeTrack={trackStorage.store}
            removeTrack={trackStorage.remove}
        /> )
    }
    return (<>
        <LogOut text={"Cerrar Sesión"} logout={
            logout({
                removeTeam: teamStorage.remove,
                onTeamChange: setTeam,
                removeTrack: () => undefined,
                onTrackChange: () => undefined,
            })
        }/>
        Logged in with: {team.token}
    </>)
}

export default App
