import { useState } from "react";
import TextInput from "../../components/TextInput";

function LoginForm(props){
    const {repository} = props
    const [leader, setLeader] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState('not set');

    function handleSubmit(e) {
        e.preventDefault(); // Prevents the page from reloading
        const response = repository.Login(leader, password);
        setData(response);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <TextInput id="leader" placeholder="Capitan" updateData={setLeader}/>
                <TextInput id="password" placeholder="Codigo" updateData={setPassword}/>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default LoginForm