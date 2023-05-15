import './App.css'
import LoginForm from './context/loginForm/LoginForm'
import FakeUserRepository from './infra/FakeLoginRepository.tsx'
import {useState} from "react";
import Track from "./context/track/Track.tsx";
import FakeTrackRepository from "./infra/FakeTrackRepository.tsx";

function App() {
    const [user, setUser] = useState()
    const [track, setTrack] = useState()

    // login -> token
    // get track -> print checkpoint
    // send answer -> [print next checkpoint, save answer]
    if (!user) {
        return (
            <><LoginForm userRepository={FakeUserRepository()} setUser={setUser}></LoginForm></>
        )
    }
    if (user && user.token !== "admin token") {
        setTrack(Track(user.token))
        return (<><Track repository={FakeTrackRepository()} track={track} setTrack={setTrack}></Track></>)
    }
    return (<>Logged in with: {user.token}</>)
}

export default App
