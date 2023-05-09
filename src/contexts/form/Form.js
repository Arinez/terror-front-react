import InputText from "../../components/input/input";
import {useState} from "react";

function Form({repository}) {
    const [leader, setLeader] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState('');

    function handleSubmit(e) {
        e.preventDefault(); // Prevents the page from reloading
        const response = repository.Login(leader, password);
        setData(response);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <InputText id="leader" placeholder="Capitan" updateData={setLeader}/>
                <InputText id="password" placeholder="Codigo" updateData={setPassword}/>
                <button type="submit">Enviar</button>
            </form>
            <p>{data}</p>
        </div>
    );
}

export default Form;
