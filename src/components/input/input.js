function InputText({id, placeholder, updateData}) {
    return (
        <input type="text" id={id} placeholder={placeholder} onChange={(e) => updateData(e.target.value)}/>
    );
}

export default InputText;
