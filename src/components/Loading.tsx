type LoadingProps = {
    text: string,
}

function Loading({text}: LoadingProps) {

    return (
        <p>{text}</p>
    )
}

export default Loading