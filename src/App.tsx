import './App.css'
import {LoginPage} from './pages/login/LoginPage.tsx'
import {useEffect, useState} from "react";
import {TrackPage} from "./pages/track/TrackPage.tsx";
import {TeamStorage} from "./services/teamStorage.ts";
import {TrackStorage} from "./services/trackStorage.ts";
import {Team} from "./types/Team.ts";

type AppProps = {
    teamStorage: TeamStorage,
    trackStorage: TrackStorage,
}
function App({teamStorage, trackStorage}: AppProps) {
    const [team, setTeam] = useState<Team>()

    useEffect( () => {
        const teamFromStorage = teamStorage.load()
        setTeam(teamFromStorage)
    }, [])
    useEffect(teamStorage.store(team), [team])

    return (<>
        <>
            {!team && <LoginPage useTeam={setTeam}/>}
            {team && <TrackPage team={team} storeTrack={trackStorage.store}/>}
        </>
    </>)
}

export default App
