import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './Loading/Loading';


export default function Register() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(true)

    const errMessage = () => toast.error("Please filled the details correctly.", {
        toastId: "notify1",
        position: "top-right",
        autoClose: 2000,
        pauseOnHover: false
    });
    const successMessage = () => toast.success("Register Successfully.", {
        toastId: "notify1",
        position: "top-right",
        autoClose: 2000,
        pauseOnHover: false
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormData({ ...formData, [name]: value })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, email, password } = formData
        const res = await fetch("/user/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
        })
        const data = await res.json();

        if (data.message === "Please filled the details correctly." || !data) {
            errMessage()
        } else {
            successMessage()
            setTimeout(() => {
                setLoading(true)
                navigate('/login')
            }, 3000);
            setLoading(false)

        }


    }

    if (!loading) {
        return <Loading />
    }

    return (
        <div className='container'>
            <h1 className='mb-3 mt-5 text-center'>Register </h1>
            <form className='form-wrap' method='POST' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        name="username"
                        className="form-control"
                        id="username"
                        aria-describedby="emailHelp"
                        value={formData.username}
                        onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        value={formData.email}
                        onChange={handleChange} />
                    <div id="email" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary">Register Now</button>
            </form>
            {/* <Link to="/login" className='nav-link'>Go to Login </Link> */}
            <ToastContainer />
        </div>
    )
}
