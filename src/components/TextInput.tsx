import {ChangeEvent} from "react";

type TextInputProps = {
    id: string,
    placeholder: string,
    onChange: (value: string) => void,
    maxLength?: number
}

function TextInput({id, placeholder, onChange, maxLength}: TextInputProps) {

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        onChange(e.target.value);
    }

    if (maxLength) {
        return (
            <input type="text" id={id}
                   placeholder={placeholder}
                   onChange={handleChange}
                   maxLength={maxLength}/>
        )
    }

    return (
        <input type="text" id={id}
               placeholder={placeholder}
               onChange={handleChange}/>
    )
}

export default TextInput