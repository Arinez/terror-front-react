function Login(leader: string, password:string) {
    if (leader === "admin" && password === "admin") {
        return "admin token";
    }
    if (leader === "cris") {
        return "user token"
    }

    return "incorrect";
}

// TODO: logout

function FakeLoginRepository() {
    return {
        Login
    }
}
export default FakeLoginRepository