type TextInputProps = {
    id: string,
    placeholder: string,
    updateData: (value: string) => void,
}
function TextInput ({id, placeholder, updateData}: TextInputProps){

    return (
        <input type="text" id={id} placeholder={placeholder} onChange={(e) => updateData(e.target.value)}/>
    )
}

export default TextInput