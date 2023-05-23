import React from "react";

type LogoutProps = {
    text: string,
    logout: () => void,
}

const LogOut:React.FC<LogoutProps> = ({text, logout}) => {
    return (
        <button onClick={logout}>{text}</button>
    )
}

export default LogOut