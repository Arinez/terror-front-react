type LogoutProps = {
    text: string,
    logout: () => void,
}

function LogOut({text, logout}: LogoutProps) {

    return (
        <button onClick={logout}>{text}</button>
    )
}

export default LogOut