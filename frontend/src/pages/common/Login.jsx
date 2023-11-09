import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userLogin } from '../../services/slices/AuthSlice';

const Login = () => {
    const token = JSON.parse(window.localStorage.getItem("token"));
    const [formValues, setFormValues] = useState({
        email: "",
        password: ""
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // handleChange func.
    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    }

    // handleSubmit func.
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: formValues?.email,
            password: formValues?.password
        }
        // console.log({ data });
        dispatch(userLogin({ data, navigate }));
    }

    // component mount cycle
    useEffect(() => {
        if (token) {
            navigate('/')
        }
    }, [token, navigate]);

    return (
        <>
            <main>
                <div className="container">

                    <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                                    <div className="d-flex justify-content-center py-4">
                                        <Link to="/" className="logo d-flex align-items-center w-auto">
                                            <img src="./assets/img/logo.png" alt="" />
                                            <span className="d-none d-lg-block">NiceAdmin</span>
                                        </Link>
                                    </div>

                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className="pt-4 pb-2">
                                                <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                                                <p className="text-center small">Enter your email & password to login</p>
                                            </div>

                                            <form onSubmit={handleSubmit} className="row g-3 needs-validation">
                                                {/* className-> was-validated */}

                                                {/* email */}
                                                <div className="col-12">
                                                    <label htmlFor="email" className="form-label">Email</label>
                                                    <div className="input-group has-validation"
                                                        style={{ border: "red" }}
                                                    >
                                                        <input
                                                            type="email"
                                                            className="form-control"
                                                            id="email"
                                                            name="email"
                                                            onChange={handleChange}
                                                            value={formValues?.email}
                                                        />
                                                    </div>
                                                </div>

                                                {/* password */}
                                                <div className="col-12">
                                                    <label htmlFor="yourPassword" className="form-label">Password</label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        id="yourPassword"
                                                        name="password"
                                                        onChange={handleChange}
                                                        value={formValues?.password}
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <button className="btn btn-primary w-100" type="submit">Login</button>
                                                </div>
                                                <div className="col-12">
                                                    <p className="small mb-0">Don't have account? <Link to="/signup">Create an account</Link></p>
                                                </div>
                                            </form>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </section>

                </div>
            </main>
        </>
    )
}

export default Login