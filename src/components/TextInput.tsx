import {ChangeEvent} from "react";

type TextInputProps = {
    id: string,
    placeholder: string,
    onChange: (value: string) => void,
}

function TextInput({id, placeholder, onChange}: TextInputProps) {

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        onChange(e.target.value);
    }

    return (
        <input type="text" id={id} placeholder={placeholder} onChange={handleChange}/>
    )
}

export default TextInput