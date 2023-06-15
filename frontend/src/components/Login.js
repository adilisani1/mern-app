import React, { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {



    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [submitForm, setSubmitForm] = useState('')


    const successMessage = () => toast.success("Logged in Successfully ", {
        toastId: "notify1",
        position: "top-right",
        autoClose: 2000,
        pauseOnHover: false
    });

    const infoMessage = () => toast.info("Please filled the details.", {
        toastId: "notify1",
        position: "top-right",
        autoClose: 2000,
        pauseOnHover: false
    });

    const errMessage = () => toast.error("Wrong credentials ", {
        toastId: "notify2",
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
        const { email, password } = formData
        const res = await fetch("/user/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        const data = await res.json();

        if (data.message === "Wrong credentials." || !data) {
            errMessage()
        } else {
            successMessage()

        }

        // try {
        //     successMessage()
        //     setSubmitForm(data)

        // } catch (e) {
        //     errMessage()
        // }
    }

    return (
        <div className='container'>
            <h1 className='mb-3 mt-5 text-center'>Login </h1>
            <form className='form-wrap' method='POST' onSubmit={handleSubmit}>
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


                <button type="submit" className="btn btn-primary">Login</button>
            </form>

            <ToastContainer />
        </div>
    )
}
