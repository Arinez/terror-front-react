function Login(leader, password) {
    if (leader === "admin" && password === "admin") {
        return "token";
    }

    return "User or password incorrect";
}

function publicAPI() {
    return {
        Login
    }
}

export default publicAPI;