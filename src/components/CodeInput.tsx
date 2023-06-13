import {ChangeEvent} from "react";

type CodeInputProps = {
    id: string,
    placeholder: string,
    onChange: (value: string) => void,
}

export default function CodeInput({id, placeholder, onChange}: CodeInputProps) {

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        onChange(value.toUpperCase());
    }

    return (
        <input type="text" id={id}
               placeholder={placeholder}
               onChange={handleChange}
               maxLength={4}/>
    )
}
