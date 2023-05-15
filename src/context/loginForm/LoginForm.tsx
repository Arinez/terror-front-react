import { useState } from "react";
import TextInput from "../../components/TextInput";

function LoginForm(props){
    const {userRepository, setUser} = props
    const [leader, setLeader] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault(); // Prevents the page from reloading
        const response = userRepository.Login(leader, password);
        if (response !== "incorrect"){
            setUser({'token': response});
        }
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