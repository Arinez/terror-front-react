import {useState} from "react";
import TextInput from "../../components/TextInput";

function Track(props){
    const {repository, track, setTrack} = props
    const [answer, setAnswer] = useState();

    function handleSubmit(e) {
        e.preventDefault(); // Prevents the page from reloading
        setTrack(repository.saveAnswer(track, answer));
        setTrack(repository.updateCurrentHint(track));
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <text>{track.getCurrentHint()}</text>
                <TextInput id="answer" placeholder="----" updateData={setAnswer}/>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default Track