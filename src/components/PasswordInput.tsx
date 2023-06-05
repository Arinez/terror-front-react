import {ChangeEvent} from "react";

type PasswordInputProps = {
    id: string,
    placeholder: string,
    onChange: (value: string) => void,
}

export default function PasswordInput({id, placeholder, onChange}: PasswordInputProps) {

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        onChange(e.target.value);
    }

    return (
        <input type="password" id={id} placeholder={placeholder} onChange={handleChange}/>
    )
}
