import './App.css'
import {LoginPage} from './pages/login/LoginPage.tsx'
import {useEffect, useState} from "react";
import {TrackPage} from "./pages/track/TrackPage.tsx";
import {TeamStorage} from "./services/teamStorage.ts";
import {TrackStorage} from "./services/trackStorage.ts";
import {Team} from "./types/Team.ts";
import {Admin} from "./types/Admin.ts";
import {AdminPanel} from "./pages/adminPanel/AdminPanel.tsx";

type AppProps = {
    teamStorage: TeamStorage,
    trackStorage: TrackStorage,
}

function App({teamStorage, trackStorage}: AppProps) {
    const [team, setTeam] = useState<Team>()
    const [admin, setAdmin] = useState<Admin>()

    useEffect(() => {
        const teamFromStorage = teamStorage.load()
        setTeam(teamFromStorage)
    }, [])
    useEffect(teamStorage.store(team), [team])

    if (admin) return (<AdminPanel admin={admin}/>)

    return (<>
        <>
            {!team && <LoginPage useTeam={setTeam} useAdmin={setAdmin}/>}
            {team && <TrackPage team={team} storeTrack={trackStorage.store}/>}
        </>
    </>)
}

export default App
