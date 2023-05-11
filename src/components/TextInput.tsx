
function TextInput (props: {id: string, placeholder: string, updateData: Function}){
    const { id, placeholder, updateData } = props

    return (
        <input type="text" id={id} placeholder={placeholder} onChange={(e) => updateData(e.target.value)}/>
    )
}

export default TextInput