function Login(leader: string, password:string) {
    if (leader === "admin" && password === "admin") {
        return "admin token";
    }
    if (leader === "cris") {
        return "user token"
    }

    return "User or password incorrect";
}

function FakeAPI() {
    return {
        Login
    }
}
export default FakeAPI