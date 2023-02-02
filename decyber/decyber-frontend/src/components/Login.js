import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "../styles/login.css"


export default function Login() {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ team_name: "", team_password: "" });


    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ team_name: credentials.team_name, team_password: credentials.team_password })//will convert the object into type JSON
        });
        const json = await response.json();
        //   console.log(json);
        if (json.success) {
            // showAlert("success", "Login Successful");
            //save the auth token and redirect
            localStorage.setItem('token', json.auth_token);
            navigate("/");
        }
        else {
            // showAlert("danger", "Invalid Credentials");
        }

    }
    return (
        <div className='Login'>
            <div className='container' style={{ width: "50%" }}>
                <form onSubmit={submitHandler}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label" style={{ color: "white" }}><h3>Team Name</h3> </label>
                        <input type="team_name" className="form-control" name="team_name" id="team_name" aria-describedby="emailHelp" value={credentials.team_name} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label" style={{ color: "white" }} ><h3>Team Password</h3></label>
                        <input type="team_password" className="form-control" name="team_password" id="team_password" value={credentials.team_password} onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#212529", color: "#3D6343", border: "none" }}>Login</button>
                    <hr style={{ color: '#3D6343' }} />
                    <div className='form-text mt-3'><p> New to DeCyber ?</p></div>
                    <Link to="/signup"><button type="submit" className="btn btn-primary my-3" style={{ backgroundColor: "#212529", color: "#3D6343", border: "none" }}>Signup</button></Link>
                </form>
            </div>
        </div>
    )
}