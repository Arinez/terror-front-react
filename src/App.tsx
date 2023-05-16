import './App.css'
import {LoginPage} from './pages/login/LoginPage.tsx'
import {TeamType} from './services/getTeamTokenMock.tsx'
import {useState} from "react";
import {TrackPage} from "./pages/track/TrackPage.tsx";

function App() {
    const [team, setTeam] = useState<TeamType>()

    // TODO: loading component
    if (!team) {
        return (
            <><LoginPage useTeam={setTeam}></LoginPage></>
        )
    }
    if (team?.token !== "admin token") {
        // TODO: team started
        return (<><TrackPage team={team}></TrackPage></>)
    }
    return (<>Logged in with: {team.token}</>)
}

export default App
