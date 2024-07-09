import React, { useState } from "react";

function Login({isLoggedIn}) {
    const [user, setUser] = useState({ userName: "", password: "" })
    const [logged, setLogged] = useState(isLoggedIn)

    function redirect(){
        window.location.href = "/form"
    }
    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    
    function handleLogin() {
        if (user.userName === "admin" && user.password === "12345") {
            const random = Math.random().toString(36).substring(2);
            localStorage.setItem("userName", "admin")
            localStorage.setItem("password", "12345")
            localStorage.setItem("token", random + random + random)
            setLogged(true)
            redirect()
        }
        else{
           alert("")
    }
} 

    return (
        <>
            <div className="row">
                <div className="col-4"></div>
                <div className="col-4">
                    <div className="mt-5">
                        <input
                            type="text"
                            className="form-control mt-3"
                            placeholder="Username"
                            name="userName"
                            value={user.userName}
                            onChange={handleChange} />

                        <input
                            type="password"
                            className="form-control mt-3"
                            placeholder="Password"
                            name="password"
                            value={user.password}
                            onChange={handleChange} />
                        <button
                            type="submit"
                            className="btn btn-success mt-3 form-control"
                            onClick={handleLogin}> Login </button>
                    </div>
                </div>
                <div className="col-4"></div>
            </div>
        </>
    )
}
export default Login